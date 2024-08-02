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
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/gorilla/feeds"
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
	filePath := os.Getenv("CDN_LOCAL_PATH") + "/" + filepath.Join("images", fileName)
	err = c.SaveUploadedFile(image, filePath)
	if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
			return
	}

	cdnFilePath := os.Getenv("CDN_URL_PATH") + "/" + filepath.Join("images", fileName)

	//!Generate an RSS Link for the podcast
	linkId := strings.ReplaceAll(uuid.New().String(), "-", "")
	rssFeed := os.Getenv("RSS_URL_PATH") + "/" + linkId

	//Create podcast in db
	podcast := models.Podcast{Name: name, Image: cdnFilePath, Description: description, Genre: genre, UserID: user.ID, RSSFeed: rssFeed}
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
		filePath := os.Getenv("CDN_LOCAL_PATH") + "/" + filepath.Join("images", fileName)
		err = c.SaveUploadedFile(image, filePath)
		if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error storing file"})
				return
		}

		//Create episode in db
		cdnFilePath := os.Getenv("CDN_URL_PATH") + "/" + filepath.Join("images", fileName)
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

//TODO: Test if this functions is functioning properly
//First test on postman -> if it working
//Then try to do a test to actually create an RSS Feed and publish to spotify and then add an episode and something like that to ensure it is actually working
func (uc *PodcastController) GetPodcastRSSFeed(c *gin.Context) {
	strId := c.Param("id")
	podcastId, _ := strconv.Atoi(strId)

	userGin, _ := c.Get("user")
	user := userGin.(models.User)

	var podcast models.Podcast
	// Retrieve podcasts with UserID = userID
	err := database.DB.Preload("Episodes").Where("user_id = ? AND ID = ?", user.ID, podcastId).First(&podcast).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Podcast not found"})
			return
	}

	var episodes []models.Episode
	// Retrieve templates with Type = "Platform" or UserID = userID
	episodesErr := database.DB.Preload("Segments").Where("podcast_id = ? AND is_published = ?", podcastId, true).Find(&episodes).Error
	if episodesErr != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error getting episodes"})
			return
	}

	//! This is the required information - There are some that the gorilla feeds package is not acknowledging
	// Title: podcast.name
	// Link: podcast.RSSFeed
	// Description: podcast.description
	// Language: pt-PT
	// PubDate: now()
	// LastBuildDate: now()
	// Category: podcast.genre
	// Items (Episodes): podcast.Episodes that have the flag isPublished, the first is the most recent, the last the most old

	now := time.Now()
	feed := &feeds.Feed{
		Title:       podcast.Name,
		Link:        &feeds.Link{Href: podcast.RSSFeed},
		Description: podcast.Description,
		Author:      &feeds.Author{Name: user.Username, Email: user.Email},
		Created:     now,
	}

	for _, episode := range episodes {
		item := &feeds.Item{
			Title:       episode.Name,
			Link:        &feeds.Link{Href: episode.Url},
			Description: episode.Description,
			Author:      &feeds.Author{Name: user.Username, Email: user.Email},
			Created:     episode.CreatedAt,
		}
		feed.Items = append(feed.Items, item)
	}
	
	rss, err := feed.ToRss()
	if err != nil {
			log.Fatal(err)
	}

	//! Return an application/xml response, that returns the XML constructed by the gorilla feeds
	c.Header("Content-Type", "application/xml")
	c.String(http.StatusOK, rss) // tODO: Check if we should use c.String or c.XML (ChatGPT recommended c.String)
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
