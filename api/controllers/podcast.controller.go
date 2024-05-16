package controllers

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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
	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	log.Println("Im here")

	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 1<<30) // 1GB

	// Parse form data and setup the limit as 1gb
	// ! This needs to be tested when frontend is up and running - The limit doesn't seem to be 1GB
	if err := c.Request.ParseMultipartForm(10 << 30); err != nil {
		log.Print("error" , err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid File, 1gb limit"})
		return
	}

	//Get the image file
	image, err := c.FormFile("image")
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"Error obtaining Image"})
		return
	}

	//Get the name
	name := c.Request.FormValue("name")
	if name == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No name was sent"})
		return
	}
	
	//Get the description
	description := c.Request.FormValue("description")
	if description == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No description was sent"})
		return
	}

	//Get the genre
	genre := c.Request.FormValue("genre")
	if genre == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No genre was sent"})
		return
	}

	// Save file
	fileExtension := filepath.Ext(image.Filename)
	if (utils.Contains(utils.IMAGE_EXTENSIONS, fileExtension)) {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid file type"})
		return
	}

	fileName := uuid.New().String() + fileExtension
	filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "images", fileName)
	err = c.SaveUploadedFile(image, filePath)
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
			return
	}

	//Create episode in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)

	podcast := models.Podcast{Name: name, Image: cdnFilePath, Description: description, Genre: genre, UserID: user.ID}
	result := database.DB.Create(&podcast)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating podcast"})
	}

	c.JSON(http.StatusOK, podcast)
}

func (uc *PodcastController) UpdatePodcast(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var podcast models.Podcast
	// Retrieve the template by its ID
	err := database.DB.First(&podcast, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Podcast not found"})
			return
	}

	c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, 1<<30) // 1GB

	// Parse form data and setup the limit as 1gb
	// ! This needs to be tested when frontend is up and running - The limit doesn't seem to be 1GB
	if err := c.Request.ParseMultipartForm(10 << 30); err != nil {
		log.Print("error" , err.Error())
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid File, 1gb limit"})
		return
	}

	//Get the image file
	image, _ := c.FormFile("image")

	//Get the name
	name := c.Request.FormValue("name")
	
	//Get the description
	description := c.Request.FormValue("description")

	//Get the genre
	genre := c.Request.FormValue("genre")

	if (image != nil) {
		// Save file
		fileExtension := filepath.Ext(image.Filename)
		if (utils.Contains(utils.IMAGE_EXTENSIONS, fileExtension)) {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid file type"})
			return
		}

		fileName := uuid.New().String() + fileExtension
		filePath := filepath.Join(os.Getenv("CDN_LOCAL_PATH"), "images", fileName)
		err = c.SaveUploadedFile(image, filePath)
		if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
				return
		}

		//Create episode in db
		cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
		podcast.Image = cdnFilePath
	}
	
	if name != "" {
		podcast.Name = name
	}
	if description != "" {
		podcast.Description = description
	}
	if genre != "" {
		podcast.Genre = genre
	}
	
	// Update the podcast
	err = database.DB.Save(&podcast).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating podcast"})
		return
	}

	c.JSON(http.StatusOK, podcast)
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