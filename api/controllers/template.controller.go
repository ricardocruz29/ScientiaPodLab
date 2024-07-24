package controllers

import (
	"net/http"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils/validators"

	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

type TemplateController struct {}

func NewTemplateController() *TemplateController {
	return &TemplateController{}
}

func (uc *TemplateController) GetTemplates(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	var templates []models.Template
	// Retrieve templates with Type = "Platform" or UserID = userID
	err := database.DB.Preload("Segments").Where("type = ? OR user_id = ?", "Platform", user.ID).Find(&templates).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error getting templates"})
			return
	}

	c.JSON(http.StatusOK, templates)
}

func (uc *TemplateController) GetTemplate(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var template models.Template
	// Retrieve the Template by its ID
	err := database.DB.Preload("Segments").First(&template, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Template not found"})
			return
	}

	c.JSON(http.StatusOK, template)
}

func (uc *TemplateController) CreateTemplate(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	payload, _ := c.Get("payload")
	info := payload.(*validators.CreateTemplateValidator)

	template := models.Template{Name: info.Name, Duration: info.Duration, Genre: info.Genre, Type: "Custom", Segments: info.Segments, UserID: user.ID}
	result := database.DB.Create(&template)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating template"})
		return
	}

	c.JSON(http.StatusOK, template);
}

func (uc *TemplateController) UpdateTemplate(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var template models.Template
	// Retrieve the template by its ID
	err := database.DB.First(&template, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Template not found"})
			return
	}

	// Check if the template is of type "Platform"
	if template.Type == "Platform" {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Cannot update template of type Platform"})
		return
	}

	payload, _ := c.Get("payload")
	info := payload.(*validators.UpdateTemplateValidator)

	if info.Name != nil {
		template.Name = *info.Name
	}
	if info.Duration != nil {
		template.Duration = *info.Duration
	}
	if info.Segments != nil {
		// Delete existing segments before updating
		err := database.DB.Delete(&models.TemplateSegment{}, "template_id = ?", template.ID).Error
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating template"})
			return
		}

		template.Segments = *info.Segments
	}
	if info.Genre != nil {
		template.Genre = *info.Genre
	}

	// Update the template
	err = database.DB.Save(&template).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating template"})
		return
	}

	c.JSON(http.StatusOK, template)
}


func (uc *TemplateController) DeleteTemplate(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var template models.Template
	// Retrieve the template by its ID
	err := database.DB.First(&template, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Template not found"})
			return
	}

	// Check if the template is of type "Platform"
	if template.Type == "Platform" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Cannot delete template of type Platform"})
		return
	}

	// Delete the template and its segments
	err = database.DB.Select(clause.Associations).Delete(&template).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting template"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Template deleted"})
}
