package controllers

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils"
	"scipodlab_api/utils/validators"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type EpisodeController struct {}

func NewEpisodeController() *EpisodeController {
	return &EpisodeController{}
}

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

func (uc *EpisodeController) GetPodcastEpisodes(c *gin.Context) {
		strId := c.Param("id")
		podcastId, _ := strconv.Atoi(strId)
	
		var episodes []models.Episode
		// Retrieve templates with Type = "Platform" or UserID = userID
		err := database.DB.Preload("Segments").Where("podcast_id = ?", podcastId).Find(&episodes).Error
		if err != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error getting episodes"})
				return
		}
	
		c.JSON(http.StatusOK, episodes)
	}

func (uc *EpisodeController) GetEpisode(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episode models.Episode
	// Retrieve the Episode by its ID
	err := database.DB.Preload("Segments").First(&episode, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}

	c.JSON(http.StatusOK, episode)
}

func (uc *EpisodeController) CreateEpisode(c *gin.Context) {
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

	//Get the Template
	strTemplateId := c.Request.FormValue("templateId")
	if strTemplateId == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No templateId was sent"})
		return
	}
	templateId, _ := strconv.Atoi(strTemplateId)

	//Get the Podcast
	strPodcastId := c.Request.FormValue("podcastId")
	if strPodcastId == "" {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error":"No podcastId was sent"})
		return
	}
	podcastId, _ := strconv.Atoi(strPodcastId)

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

	episode := models.Episode{Name: name, Image: cdnFilePath, Description: description, TemplateID: templateId, PodcastID: podcastId}
	result := database.DB.Create(&episode)

	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error creating episode"})
	}

	c.JSON(http.StatusOK, episode)
}

func (uc *EpisodeController) UpdateEpisode(c *gin.Context) {
	strId := c.Param("id")
	id, _ := strconv.Atoi(strId)

	var episode models.Episode
	// Retrieve the episode by its ID
	err := database.DB.First(&episode, id).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
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

	//Get the Template
	strTemplateId := c.Request.FormValue("templateId")
	var templateId int
	if strTemplateId != "" {
		templateId, _ = strconv.Atoi(strTemplateId)
	}
	
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
		episode.Image = cdnFilePath
	}
	
	if name != "" {
		episode.Name = name
	}
	if description != "" {
		episode.Description = description
	}

	if strTemplateId != "" {
		episode.TemplateID = templateId
	}
	
	// Update the episode
	err = database.DB.Save(&episode).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating episode"})
		return
	}

	c.JSON(http.StatusOK, episode)
}

func (uc *EpisodeController) DeleteEpisode(c *gin.Context) {
  //TODO: Delete an episode and its segments -> Access if this should be possible after the episode is published
}

func (uc *EpisodeController) RenderEpisode(c *gin.Context) {
	//!: Triggered when the users finishes the episode and clicks on render
	//!: Also on update, have a function that checks if any segments were changed, and if so, call this endpoint to re-render the episode (Have a function in FE to check if any segments were changed to prevent an overload of unnecessary rerender)
	strId := c.Param("id")
	episodeId, _ := strconv.Atoi(strId)

	//Get the info from payload
	payload, _ := c.Get("payload")
	info, _ := payload.(*validators.RenderEpisodeValidator)
	

	var episode models.Episode
	// Retrieve the Episode by its ID
	err := database.DB.Preload("Segments.Resource").First(&episode, episodeId).Error
	if err != nil {
			c.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Episode not found"})
			return
	}


	//TODO: Gather all the segments and the resource of each segment
	//TODO: Send them via rabbitmq to the audio render ms to generate the final audio
	//TODO: include the bool flag of noise cancellation
	log.Println("include noise cancellation: ", info.NoiseCancellation);

	//! The Audio Render MS will then store the file and send back its uuid and the duration
	fileName := "MOCK_FINAL_FILENAME.mp3"
	duration := 37.3 //in seconds
	
	episode.Url = filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
	episode.Duration = duration
	// Update the episode in DB
	err = database.DB.Save(&episode).Error
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating episode"})
		return
	}

	//TODO: Get the Podcast of this Episode and check if it has an RSS Feed. 
	//!If it hasn't, generate the RSS Feed.

	//! See in the chatgpt how. We are going to use gorilla feeds
	//! Then we store the details of that RSS feed -> Check if it is worth to create a model for the RSS Feed
	//! Then, for publishing a new episode, we are going to get that RSS Feed and create a "new" one but with the exact same information, like Link, Author, Title, Image etc
	//! And we add the items to the RSS feed once again
}

func (uc *EpisodeController) PublishEpisode(c *gin.Context) {
	//TODO: If the podcast already has one RSS Feed and at least one episode, we need to update the RSS Feed with a new episode (It goes for the first place in the metadata)
	//TODO: If the podcast has one RSS Feed, but no episodes, add this as the first one.

	//! Both processes will be similar, if there are 10 or 0 episodes, the new episode to be published will go into the first position of the RSS Feed.
}
