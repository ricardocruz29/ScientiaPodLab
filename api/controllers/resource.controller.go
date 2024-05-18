package controllers

import (
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
	err := database.DB.Where("(type = ? OR user_id = ?) AND (type_segment = ? OR type_segment = ?)", "Platform", user.ID, "TTS", "SoundEffect").Find(&resources).Error
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

	//Create episode in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
	resource := models.Resource{NameCDN: fileName, Name: name, Url: cdnFilePath,  Type: "Custom", TypeSegment: typeSegment, UserID: user.ID}
	result := database.DB.Create(&resource)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating resource"})
	}

	c.JSON(http.StatusOK, resource)
}

func (uc *ResourceController) CreateTTSResource(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	//Get the info from payload
	payload, _ := c.Get("payload")
	info := payload.(*validators.CreateTTSValidator)

	// TODO: Http Request to generate audio with info.Text (Text-to-Speech)
	// TODO: In the TTS MS, store the file in the CDN
	//! Will receive its fileName - Will be an uuid
	fileName := "MOCK_FILENAME.mp3"
	
	//Create resource in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
	resource := models.Resource{NameCDN: fileName, Name: info.Name, Url: cdnFilePath,  Type: "Custom", TypeSegment: "TTS", UserID: user.ID}
	result := database.DB.Create(&resource)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating resource"})
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
