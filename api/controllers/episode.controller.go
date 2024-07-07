package controllers

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/events"
	"scipodlab_api/models"
	"scipodlab_api/utils"
	"scipodlab_api/utils/validators"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type EpisodeController struct {}

func NewEpisodeController() *EpisodeController {
	return &EpisodeController{}
}

func (uc *EpisodeController) GetPodcastEpisodes(c *gin.Context) {
		strId := c.Param("id")
		podcastId, _ := strconv.Atoi(strId)
	
		var episodes []models.Episode
		// Retrieve templates with Type = "Platform" or UserID = userID
		err := database.DB.Preload("Segments").Where("podcast_id = ?", podcastId).Find(&episodes).Error
		if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error getting episodes"})
				return
		}
	
		c.JSON(http.StatusOK, episodes)
	}

func (uc *EpisodeController) GetEpisode(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episode models.Episode
	// Retrieve the Episode by its ID
	err := database.DB.Preload("Segments").First(&episode, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}

	c.JSON(http.StatusOK, episode)
}

func (uc *EpisodeController) CreateEpisode(c *gin.Context) {
	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 1<<30) // 1GB

	// Parse form data and setup the limit as 1gb
	// ! This needs to be tested when frontend is up and running - The limit doesn't seem to be 1GB
	if err := c.Request.ParseMultipartForm(10 << 30); err != nil {
		log.Print("error" , err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid File, 1gb limit"})
		return
	}

	//Get the image file
	image, err := c.FormFile("image")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"Error obtaining Image"})
		return
	}

	//Get the name
	name := c.Request.FormValue("name")
	if name == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No name was sent"})
		return
	}
	
	//Get the description
	description := c.Request.FormValue("description")
	if description == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No description was sent"})
		return
	}

	//Get the Template
	strTemplateId := c.Request.FormValue("templateId")
	if strTemplateId == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No templateId was sent"})
		return
	}
	templateId, _ := strconv.Atoi(strTemplateId)

	//Get the Podcast
	strPodcastId := c.Request.FormValue("podcastId")
	if strPodcastId == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No podcastId was sent"})
		return
	}
	podcastId, _ := strconv.Atoi(strPodcastId)

	// Save file
	fileExtension := filepath.Ext(image.Filename)
	if (utils.Contains(utils.IMAGE_EXTENSIONS, fileExtension)) {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid file type"})
		return
	}

	fileName := uuid.New().String() + fileExtension
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "images", fileName)
	err = c.SaveUploadedFile(image, filePath)
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
			return
	}

	//Create podcast in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "images", fileName)

	episode := models.Episode{Name: name, Image: cdnFilePath, Description: description, TemplateID: templateId, PodcastID: podcastId}
	result := database.DB.Create(&episode)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating episode"})
	}

	c.JSON(http.StatusOK, episode)
}

func (uc *EpisodeController) UpdateEpisode(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episode models.Episode
	// Retrieve the episode by its ID
	err := database.DB.First(&episode, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}

	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 1<<30) // 1GB
	// Parse form data and setup the limit as 1gb
	// ! This needs to be tested when frontend is up and running - The limit doesn't seem to be 1GB
	if err := c.Request.ParseMultipartForm(10 << 30); err != nil {
		log.Print("error" , err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid File, 1gb limit"})
		return
	}

	//Get the image file
	image, _ := c.FormFile("image")

	//Get the name
	name := c.Request.FormValue("name")
	
	//Get the description
	description := c.Request.FormValue("description")

	//Get the Template
	strTemplateId := c.Request.FormValue("templateId")
	var templateId int
	if strTemplateId != "" {
		templateId, _ = strconv.Atoi(strTemplateId)
	}
	
	if (image != nil) {
		// Save file
		fileExtension := filepath.Ext(image.Filename)
		if (utils.Contains(utils.IMAGE_EXTENSIONS, fileExtension)) {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid file type"})
			return
		}

		fileName := uuid.New().String() + fileExtension
		filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "images", fileName)
		err = c.SaveUploadedFile(image, filePath)
		if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
				return
		}

		//Create episode in db
		cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "images", fileName)
		episode.Image = cdnFilePath
	}
	
	if name != "" {
		episode.Name = name
	}
	if description != "" {
		episode.Description = description
	}

	if strTemplateId != "" {
		episode.TemplateID = templateId
	}
	
	// Update the episode
	err = database.DB.Save(&episode).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating episode"})
		return
	}

	c.JSON(http.StatusOK, episode)
}

func (uc *EpisodeController) DeleteEpisode(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episode models.Episode
	// Retrieve the episode by its ID
	err := database.DB.First(&episode, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}

	// Delete the episode
	if (episode.IsPublished) {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Your episode is already published, so it can't be deleted"})
		return
	}

	err = database.DB.Delete(&episode).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting episode"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Episode deleted"})
}

func (uc *EpisodeController) RenderEpisode(c *gin.Context) {
	//!: Triggered when the users finishes the episode and clicks on render
	//!: Also on update, have a function that checks if any segments were changed, and if so, call this endpoint to re-render the episode (Have a function in FE to check if any segments were changed to prevent an overload of unnecessary rerender)
	strId := c.Param("id")
	episodeId, _ := strconv.Atoi(strId)

	//Get the info from payload
	payload, _ := c.Get("payload")
	info, _ := payload.(*validators.RenderEpisodeValidator)

	var episode models.Episode
	// Retrieve the Episode by its ID
	err := database.DB.Preload("Segments").First(&episode, episodeId).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}

	var resources []string

	// Iterate through the segments to retrieve and append the corresponding resources
	for _, segment := range episode.Segments {
			if segment.ResourceID != nil {
				var nameCDN string
				if err := database.DB.Model(&models.Resource{}).Select("name_cdn").Where("id = ?", *segment.ResourceID).Scan(&nameCDN).Error; err == nil {
					resources = append(resources, nameCDN)
				}
			}
	}

	episode.Status = "RENDERING";
	// Update the episode
	err = database.DB.Save(&episode).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error rendering episode"})
		return
	}

	events.SendEpisodeToRender(resources, info.NoiseCancellation, episodeId)

	// We don't need to send anything to the user because this will be async -> The user will not await for the response
	c.JSON(http.StatusOK, gin.H{
		"message": "Successfully started rendering episode", 
	})
}

func (uc *EpisodeController) PublishEpisode(c *gin.Context) {
	//! This endpoint doesn't need to create an RSS Feed -> it just needs to set a flag isPublished on the episode
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episode models.Episode
	// Retrieve the Episode by its ID
	err := database.DB.Preload("Segments").First(&episode, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}

	episode.IsPublished = true;
	episode.Status = "PUBLISHED";

	// Update the episode
	err = database.DB.Save(&episode).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error publishing episode"})
		return
	}

	c.JSON(http.StatusOK, episode)
}
