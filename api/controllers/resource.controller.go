package controllers

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils"
	"scipodlab_api/utils/validators"

	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ResourceController struct {}

func NewResourceController() *ResourceController {
	return &ResourceController{}
}

func (uc *ResourceController) GetResources(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	var resources []models.Resource
	// Retrieve resources with Type = "Platform" or UserID = userID and TypeSegment = "TTS" OR TypeSegment = "SoundEffect"
	err := database.DB.Where("(type = ? OR user_id = ?) AND (type_segment = ? OR type_segment = ? OR type_segment = ? OR type_segment = ? OR type_segment = ?)", "Platform", user.ID, "TTS", "SoundEffect", "Outro", "Intro", "Content").Find(&resources).Error
	if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error":"Error getting resources"})
	}

	c.JSON(http.StatusOK, resources)
}

func (uc *ResourceController) CreateResource(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 1<<30) // 1GB

	// Parse form data and setup the limit as 1gb
	// ! This needs to be tested when frontend is up and running - The limit doesn't seem to be 1GB
	if err := c.Request.ParseMultipartForm(10 << 30); err != nil {
		log.Print("error" , err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid File, 1gb limit"})
		return
	}

	//Get the resource file
	resourceAudio, err := c.FormFile("resource_audio")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"Error obtaining Resource Audio"})
		return
	}

	//Get the Type Segment
	typeSegment := c.Request.FormValue("type_segment")
	if typeSegment == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No type segment was sent"})
		return
	}

	//Get the Name
	name := c.Request.FormValue("name")
	if name == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No name was sent"})
		return
	}

	// Save file
	fileExtension := filepath.Ext(resourceAudio.Filename)
	if (utils.Contains(utils.AUDIO_EXTENSIONS, fileExtension)) {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid file type"})
		return
	}

	fileName := uuid.New().String() + fileExtension
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "audios/resources", fileName)
	err = c.SaveUploadedFile(resourceAudio, filePath)
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
			return
	}

	//Create resource in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
	resource := models.Resource{NameCDN: fileName, Name: name, Url: cdnFilePath,  Type: "Custom", TypeSegment: typeSegment, UserID: user.ID}
	result := database.DB.Create(&resource)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating resource"})
	}

	// Get the EpisodeSegmentID if sent
	strEpisodeSegmentId := c.Request.FormValue("episode_segment_id")
	if strEpisodeSegmentId != "" {
		episodeSegmentId, err := strconv.Atoi(strEpisodeSegmentId)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid episode_segment_id"})
		}

		var episodeSegment models.EpisodeSegment
		// Retrieve the episode segment by its ID
		err = database.DB.First(&episodeSegment, episodeSegmentId).Error
		if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode segment not found"})
			return
		}

		// Add the resourceId to the episodeSegment and save it
		resourceID := int(resource.ID)
		episodeSegment.ResourceID = &resourceID
		if err := database.DB.Save(&episodeSegment).Error; err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating episode segment"})
			return
		}

		// Add the episodeSegment to the resource's EpisodeSegments slice and save the resource
		resource.EpisodeSegments = append(resource.EpisodeSegments, episodeSegment)
		if err := database.DB.Save(&resource).Error; err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating resource with episode segment"})
			return
		}
	}

	c.JSON(http.StatusOK, resource)
}

func (uc *ResourceController) CreateTTSResource(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	//Get the info from payload
	payload, _ := c.Get("payload")
	info := payload.(*validators.CreateTTSValidator)

	// Prepare the request payload for the Python API
	requestPayload := map[string]string{
		"text":  info.Text,
		"voice": info.Voice,
	}

	jsonPayload, err := json.Marshal(requestPayload)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to marshal request payload"})
		return
	}

	pythonAPIURL := os.Getenv("AUDIO_RENDER_URL") + "/tts"
	req, err := http.NewRequest("POST", pythonAPIURL, bytes.NewBuffer(jsonPayload))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request to TTS API"})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"error": "TTS API returned non-200 status"})
		return
	}

	var response map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode response from TTS API"})
		return
	}

	// Assume the Python API responds with a JSON object that contains the tts_audio_id
	ttsAudioID, ok := response["tts_audio_id"].(string)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid response from TTS API"})
		return
	}
	
	//Create resource in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", ttsAudioID)
	resource := models.Resource{NameCDN: ttsAudioID, Name: info.Name, Url: cdnFilePath,  Type: "Custom", TypeSegment: "TTS", UserID: user.ID}
	result := database.DB.Create(&resource)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating resource"})
	}

	//Get the EpisodeSegmentID if sent
	strEpisodeSegmentId := c.Request.FormValue("episode_segment_id")
	var episodeSegmentId int;
	if strEpisodeSegmentId != "" {
		episodeSegmentId, _ = strconv.Atoi(strEpisodeSegmentId)

		var episodeSegment models.EpisodeSegment
		// Retrieve the episode segment by its ID
		err := database.DB.First(&episodeSegment, episodeSegmentId).Error
		if err != nil {
				c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode segment not found"})
				return
		}

		//Add the resourceId to the episodeSegment
		// Get the EpisodeSegmentID if sent
		strEpisodeSegmentId := c.Request.FormValue("episode_segment_id")
		if strEpisodeSegmentId != "" {
			episodeSegmentId, err := strconv.Atoi(strEpisodeSegmentId)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid episode_segment_id"})
			}

			var episodeSegment models.EpisodeSegment
			// Retrieve the episode segment by its ID
			err = database.DB.First(&episodeSegment, episodeSegmentId).Error
			if err != nil {
				c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode segment not found"})
				return
			}

			// Add the resourceId to the episodeSegment and save it
			resourceID := int(resource.ID)
			episodeSegment.ResourceID = &resourceID
			if err := database.DB.Save(&episodeSegment).Error; err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating episode segment"})
				return
			}

			// Add the episodeSegment to the resource's EpisodeSegments slice and save the resource
			resource.EpisodeSegments = append(resource.EpisodeSegments, episodeSegment)
			if err := database.DB.Save(&resource).Error; err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating resource with episode segment"})
				return
			}
		}
	}

	c.JSON(http.StatusOK, resource)
}

func (uc *ResourceController) DeleteResource(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var resource models.Resource
	// Retrieve the resource by its ID
	err := database.DB.First(&resource, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Resource not found"})
			return
	}

	// Check if the resource is of type "Platform"
	if resource.Type == "Platform" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Cannot delete resource of type Platform"})
		return
	}

	// Delete the resource
	err = database.DB.Delete(&resource).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting resource"})
		return
	}

	// Remove file
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "audios/resources", resource.NameCDN)
	err = os.Remove(filePath)
	if err != nil {
			log.Println("Error: ", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting file"})
			return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Resource deleted"})
}
