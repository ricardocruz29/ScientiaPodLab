package controllers

import (
	"fmt"
	"net/http"
	"scipodlab_api/config"
	"scipodlab_api/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type EpisodeController struct {}

func NewEpisodeController() *EpisodeController {
	return &EpisodeController{}
}

func (uc *EpisodeController) CreateEpisode(c *gin.Context, db *gorm.DB) {
	// Parse form data and setup the limit as 1gb
	if err := c.Request.ParseMultipartForm(1 << 30); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error processing form"})
		c.Abort()
		return
	}

	//Get the episode file
	episodeAudio, err := c.FormFile("episode_audio")
	if err != nil {
		c.JSON(http.StatusBadRequest, "Error obtaining audio")
		return
	}

	// Get the other info for episode
	podcastId, err := strconv.ParseUint(c.PostForm("podcastId"), 10, 64)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Error converting podcastId")
		return
	}

	//Check if podcast exists
	var podcast models.Podcast
	var podcastErr error
	podcastErr = db.First(&podcast, podcastId).Error
	
	if podcastErr != nil && err == gorm.ErrRecordNotFound {
		c.JSON(http.StatusBadRequest, "Podcast does not exist!")
		return
	}

	// Save file
	err = c.SaveUploadedFile(episodeAudio, fmt.Sprintf("%s/audios", config.AppConfig.CdnLocalPath))
	if err != nil {
			c.JSON(http.StatusInternalServerError, "Error storing file")
			return
	}

	//Create episode in db
	episode := models.Episode{PodcastID: uint(podcastId), Url: fmt.Sprintf("%s/audios/%s", config.AppConfig.CdnUrlPath, episodeAudio.Filename)}
	result := db.Create(&episode)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, "Error creating user")
	}
}

func (uc *EpisodeController) GetEpisodes(c *gin.Context, db *gorm.DB) {
    
}

func (uc *EpisodeController) GetEpisode(c *gin.Context, db *gorm.DB) {
    
}

func (uc *EpisodeController) UpdateEpisode(c *gin.Context, db *gorm.DB) {
   
}

func (uc *EpisodeController) DeleteEpisode(c *gin.Context, db *gorm.DB) {
    
}