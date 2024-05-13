package controllers

import (
	"net/http"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm/clause"
)

type PodcastController struct {}

func NewPodcastController() *PodcastController {
	return &PodcastController{}
}

func (uc *PodcastController) GetPodcasts(c *gin.Context) {
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	var podcasts []models.Podcast
	// Retrieve templates with Type = "Platform" or UserID = userID
	err := database.DB.Preload("Episodes").Where("user_id = ?", user.ID).Find(&podcasts).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error getting podcasts"})
			return
	}

	c.JSON(http.StatusOK, podcasts)
}

func (uc *PodcastController) GetPodcast(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	var podcast []models.Podcast
	// Retrieve templates with Type = "Platform" or UserID = userID
	err := database.DB.Preload("Episodes").Where("user_id = ? AND ID = ?", user.ID, id).First(&podcast).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Podcast not found"})
			return
	}

	c.JSON(http.StatusOK, podcast)
}

func (uc *PodcastController) CreatePodcast(c *gin.Context) {
    
}

func (uc *PodcastController) UpdatePodcast(c *gin.Context) {
   
}

func (uc *PodcastController) DeletePodcast(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var podcast models.Podcast
	// Retrieve the template by its ID
	err := database.DB.First(&podcast, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Podcast not found"})
			return
	}

	// Delete the template
	err = database.DB.Select(clause.Associations).Delete(&podcast).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting podcast"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Podcast deleted"})
}