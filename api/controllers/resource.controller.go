package controllers

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils"

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
	// Retrieve resources with Type = "Platform" or UserID = userID
	err := database.DB.Where("type = ? OR user_id = ?", "Platform", user.ID).Find(&resources).Error
	if err != nil {
			c.JSON(http.StatusInternalServerError, "Error getting resources")
	}

	c.JSON(http.StatusOK, resources)
}

func (uc *ResourceController) CreateResource(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	// Parse form data and setup the limit as 1gb
	// ! This needs to be tested when frontend is up and running - The limit doesn't seem to be 1GB
	if err := c.Request.ParseMultipartForm(1 << 30); err != nil {
		log.Print("error" , err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid File, 1gb limit")
		return
	}

	//Get the resource file
	resourceAudio, err := c.FormFile("resource_audio")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Error obtaining Resource Audio")
		return
	}

	// Save file
	fileExtension := filepath.Ext(resourceAudio.Filename)
	if (utils.Contains(utils.AUDIO_EXTENSIONS, fileExtension)) {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Invalid file type")
		return
	}

	fileName := uuid.New().String() + fileExtension
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "audios/resources", fileName)
	err = c.SaveUploadedFile(resourceAudio, filePath)
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, "Error storing file")
			return
	}

	//Create episode in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
	resource := models.Resource{NameCDN: fileName, Name: resourceAudio.Filename, Url: cdnFilePath,  Type: "Custom", UserID: user.ID}
	result := database.DB.Create(&resource)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, "Error creating resource")
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
			c.AbortWithStatusJSON(http.StatusNotFound, "Resource not found")
			return
	}

	// Check if the resource is of type "Platform"
	if resource.Type == "Platform" {
		c.AbortWithStatusJSON(http.StatusNotFound, "Cannot delete resource of type Platform")
		return
	}

	// Delete the resource
	err = database.DB.Delete(&resource).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, "Error deleting resource")
		return
	}

	// Remove file
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "audios/resources", resource.NameCDN)
	err = os.Remove(filePath)
	if err != nil {
			log.Println("Error: ", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, "Error deleting file")
			return
	}

	c.JSON(http.StatusOK, "Resource deleted")
}
