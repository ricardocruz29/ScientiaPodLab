package controllers

import (
	"fmt"
	"net/http"
	"os"
	"scipodlab_api/models"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type SegmentController struct {}

func NewSegmentController() *SegmentController {
	return &SegmentController{}
}

func (sc *SegmentController) CreateSegment(c *gin.Context, db *gorm.DB) {
	// Parse form data and setup the limit as 1gb
	if err := c.Request.ParseMultipartForm(1 << 30); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Error processing form"})
		c.Abort()
		return
	}

	//Get the segment file
	episodeSegment, err := c.FormFile("episode_segment")
	if err != nil {
		c.JSON(http.StatusBadRequest, "Error obtaining audio")
		return
	}

	// Get the other info for episode
	episodeId, err := strconv.ParseUint(c.PostForm("episodeId"), 10, 64)
	if err != nil {
		c.JSON(http.StatusInternalServerError, "Error converting podcastId")
		return
	}

	//Check if podcast exists
	var episode models.Episode
	episodeErr := db.First(&episode, episodeId).Error
	
	if episodeErr != nil && err == gorm.ErrRecordNotFound {
		c.JSON(http.StatusBadRequest, "Episode does not exist!")
		return
	}

	// Save file
	err = c.SaveUploadedFile(episodeSegment, fmt.Sprintf("%s/audios/segments/recorded", os.Getenv("CdnLocalPath")))
	if err != nil {
			c.JSON(http.StatusInternalServerError, "Error storing file")
			return
	}

	//TODO Get the last position for the last segment of this episode
	// var position int
	var highestPositionSegment models.EpisodeSegment
	result := db.Table("episode_segments").Where("episode_id = ?", episodeId).Order("position DESC").Last(&highestPositionSegment)

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		c.JSON(http.StatusInternalServerError, "Error obtaining last segment position")
			return
	} else if result.RowsAffected == 0 {
			//No segments for this episode
			// position = 0
	} else {
			//Get last segment position and +1 for the new segment
			// position = highestPositionSegment.Position + 1
	}


	//Create segment in db
	// segment := models.Segment{Position: position, Path: fmt.Sprintf("%s/audios/segments/recorded/%s", os.Getenv("CdnLocalPath"), episodeSegment.Filename), Type: "recorded"}
	// db.Create(&segment)

	//Create the entry on the association table between episodes and segments
	// episode.Segments = append(episode.Segments, &segment)
	db.Save(&episode)	
}

func (sc *SegmentController) GetSegments(c *gin.Context, db *gorm.DB) {
    
}

func (sc *SegmentController) GetSegment(c *gin.Context, db *gorm.DB) {
    
}

func (sc *SegmentController) UpdateSegment(c *gin.Context, db *gorm.DB) {
   
}

func (sc *SegmentController) DeleteSegment(c *gin.Context, db *gorm.DB) {
    
}