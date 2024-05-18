package controllers

import (
	"net/http"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils/validators"
	"strconv"

	"github.com/gin-gonic/gin"
)

type SegmentController struct {}

func NewSegmentController() *SegmentController {
	return &SegmentController{}
}

//! This endpoints will be used only when user clicks to add a new segment. The batch of all of the other segments, will be created in the episode/template -> they will be sent as children per say
func (sc *SegmentController) CreateTemplateSegment(c *gin.Context) {
	payload, _ := c.Get("payload")
	info := payload.(*validators.CreateTemplateSegmentValidator)

	templateSegment := models.TemplateSegment{Position: info.Position, Type: info.Type, TemplateID: info.TemplateID}
	result := database.DB.Create(&templateSegment)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating template segment"})
		return
	}

	c.JSON(http.StatusOK, templateSegment);
}

func (sc *SegmentController) DeleteTemplateSegment(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var templateSegment models.TemplateSegment
	// Retrieve the template segment by its ID
	err := database.DB.First(&templateSegment, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Template Segment not found"})
			return
	}

	// Delete the template segment
	err = database.DB.Delete(&templateSegment).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting template segment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Template segment deleted"})
}

func (sc *SegmentController) CreateEpisodeSegment(c *gin.Context) {
	payload, _ := c.Get("payload")
	info := payload.(*validators.CreateEpisodeSegmentValidator)

	episodeSegment := models.EpisodeSegment{Position: info.Position, Type: info.Type, EpisodeID: info.EpisodeID}
	result := database.DB.Create(&episodeSegment)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating episode segment"})
		return
	}

	c.JSON(http.StatusOK, episodeSegment);
}

func (sc *SegmentController) DeleteEpisodeSegment(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episodeSegment models.EpisodeSegment
	// Retrieve the episode Segment by its ID
	err := database.DB.First(&episodeSegment, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode Segment not found"})
			return
	}

	// Delete the episode segment
	err = database.DB.Delete(&episodeSegment).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting episode segment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Episode segment deleted"})
}