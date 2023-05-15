package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type EpisodeController struct {}

func NewEpisodeController() *EpisodeController {
	return &EpisodeController{}
}

func (uc *EpisodeController) CreateEpisode(c *gin.Context, db *gorm.DB) {
    
}

func (uc *EpisodeController) GetEpisodes(c *gin.Context, db *gorm.DB) {
    
}

func (uc *EpisodeController) GetEpisode(c *gin.Context, db *gorm.DB) {
    
}

func (uc *EpisodeController) UpdateEpisode(c *gin.Context, db *gorm.DB) {
   
}

func (uc *EpisodeController) DeleteEpisode(c *gin.Context, db *gorm.DB) {
    
}