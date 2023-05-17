package controllers

import (
	"net/http"
	"scipodlab_api/config"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type EpisodeController struct {}

func NewEpisodeController() *EpisodeController {
	return &EpisodeController{}
}

func (uc *EpisodeController) CreateEpisode(c *gin.Context, db *gorm.DB) {
	episodeAudio, err := c.FormFile("episode_audio")
	if err != nil {
		c.JSON(http.StatusBadRequest, "Error obtaining audio")
		return
	}

	// Save file
	err = c.SaveUploadedFile(episodeAudio, config.AppConfig.CdnPath)
	if err != nil {
			c.JSON(http.StatusInternalServerError, "Error storing file")
			return
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