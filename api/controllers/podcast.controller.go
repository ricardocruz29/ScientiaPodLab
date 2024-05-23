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
	// Retrieve podcasts with UserID = userID
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

	var podcast models.Podcast
	// Retrieve podcasts with UserID = userID
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

	//Create podcast in db
	cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "images", fileName)

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
	// Retrieve the podcast by its ID
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
		cdnFilePath := filepath.Join(os.Getenv("CDN_URL_PATH"), "images", fileName)
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
	// Retrieve the podcast by its ID
	err := database.DB.First(&podcast, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Podcast not found"})
			return
	}

	// Delete the podcast
	err = database.DB.Select(clause.Associations).Delete(&podcast).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error deleting podcast"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Podcast deleted"})
}

func (uc *PodcastController) GetPodcastRSSFeed(c *gin.Context) {
	// TODO: Get Podcast episodes that have the flag isPublished
	// TODO: With Gorilla Feeds, create the RSS Feed
	//! This is the required information
	// Title: podcast.name
	// Link: podcast.RSSFeed
	// Description: podcast.description
	// Language: pt-PT
	// PubDate: now()
	// LastBuildDate: now()
	// Category: podcast.genre
	// Items (Episodes): podcast.Episodes that have the flag isPublished, the first is the most recent, the last the most old

	//! Return an application/xml response, that returns the XML constructed by the gorilla feeds

	//? Helper -> This will be something like that
	// c.Header("Content-Type", "application/xml")
	// c.XML(http.StatusOK, rssFeed)
}

//TODO: Check if there is any information in here that can be deleted
//! RSS Feed Generation
//! After the publish of an episode, we need to check if it is the first episode: TODO: This means we need to create a publish episode endpoint
//! If that's the case, we need to generate a new RSS Feed for that specific episode. More information about RSS Feeds below
		// 	RSS feed generation is a critical aspect of podcast hosting platforms. The RSS feed serves as a standardized format for distributing information about podcast episodes to podcast directories and subscribers. Here's a more detailed breakdown of how RSS feed generation works:
		//     1. Podcast Metadata: When a user uploads a new episode to the hosting platform, the platform collects metadata about the episode. This metadata typically includes information such as the episode title, description, publication date, duration, and audio file URL.
		//     2. XML Formatting: RSS feeds are typically formatted using XML (Extensible Markup Language). The hosting platform needs to convert the metadata for each episode into XML format according to the specifications outlined in the RSS 2.0 or Atom syndication formats, which are commonly used for podcasts.
		//     3. Enclosures: One of the essential components of an RSS feed for a podcast is the enclosure element. This element contains information about the audio file associated with each episode, including its URL, file type, and file size. The hosting platform must include this enclosure element in the XML for each episode.
		//     4. Episode Listing: The RSS feed should include a listing of all the episodes available for the podcast, typically in reverse chronological order (with the most recent episode listed first). Each episode entry in the RSS feed contains metadata about the episode, as well as the enclosure element pointing to the audio file.
		//     5. RSS Feed URL: Once the hosting platform has generated the RSS feed XML for a podcast, it assigns a URL to the feed. This URL serves as the address where podcast directories and subscribers can access the RSS feed to retrieve information about the podcast's episodes.
		//     6. Updating the Feed: Whenever a new episode is uploaded or existing episode metadata is modified, the hosting platform needs to update the RSS feed accordingly. This ensures that podcast directories and subscribers always have access to the latest information about the podcast's episodes.
		// Overall, RSS feed generation is a crucial component of podcast hosting platforms, as it enables podcast creators to distribute their content to a wide audience through podcast directories and subscription platforms.
//! If the podcast already has one RSS Feed and at least one episode, we need to update the RSS Feed with a new episode (It goes for the first place in the metadata)

//!To do either of this, the process seems similar. Use this package: "github.com/gorilla/feeds": https://pkg.go.dev/github.com/gorilla/feeds 
