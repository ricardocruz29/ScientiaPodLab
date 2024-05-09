package controllers

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"strconv"

	"github.com/gin-gonic/gin"
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
	if err := c.Request.ParseMultipartForm(1 << 30); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Error processing form"})
		return
	}

	//Get the resource file
	resourceAudio, err := c.FormFile("resource_audio")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, "Error obtaining Resource Audio")
		return
	}

	// Save file
	err = c.SaveUploadedFile(resourceAudio, fmt.Sprintf("%s/audios/resources", os.Getenv("CDN_LOCAL_PATH")))
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, "Error storing file")
			return
	}

	//Create episode in db
	resource := models.Resource{Name: resourceAudio.Filename, Url: fmt.Sprintf("%s/audios/resources/%s", os.Getenv("CDN_URL_PATH"), resourceAudio.Filename),  Type: "Custom", UserID: user.ID}
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
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "audios/resources", resource.Name)
	err = os.Remove(filePath)
	if err != nil {
			log.Println("Error: ", err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, "Error deleting file")
			return
	}

	c.JSON(http.StatusOK, "Resource deleted")
}
