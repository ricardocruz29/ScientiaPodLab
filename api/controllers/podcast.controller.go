package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PodcastController struct {}

func NewPodcastController() *PodcastController {
	return &PodcastController{}
}

func (uc *PodcastController) CreatePodcast(c *gin.Context, db *gorm.DB) {
    
}

func (uc *PodcastController) GetPodcasts(c *gin.Context, db *gorm.DB) {
    
}

func (uc *PodcastController) GetPodcast(c *gin.Context, db *gorm.DB) {
    
}

func (uc *PodcastController) UpdatePodcast(c *gin.Context, db *gorm.DB) {
   
}

func (uc *PodcastController) DeletePodcast(c *gin.Context, db *gorm.DB) {
    
}