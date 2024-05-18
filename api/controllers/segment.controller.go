package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type SegmentController struct {}

func NewSegmentController() *SegmentController {
	return &SegmentController{}
}

//! TODO: Will be used when the user adds a new segment while recording a new episode.
//! The other episode segments will be sent in the initial createEpisode structure
func (sc *SegmentController) CreateSegment(c *gin.Context, db *gorm.DB) {

}

func (sc *SegmentController) DeleteSegment(c *gin.Context, db *gorm.DB) {
    
}