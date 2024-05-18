package controllers

import (
	"github.com/gin-gonic/gin"
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

func (uc *EpisodeController) GetEpisodes(c *gin.Context) {
    //TODO: Get all the episodes of a certain podcast
}

func (uc *EpisodeController) GetEpisode(c *gin.Context) {
		//TODO: Get a certain episode
}

func (uc *EpisodeController) CreateEpisode(c *gin.Context) {
	//TODO: Create Episode will fill in the "details" of the episode and will create the base -> Similar to Podcast create: Name, Image, Description, PodcastID and TemplateID maybe

	//! Old code -> Check if is usable
	// // Parse form data and setup the limit as 1gb
	// if err := c.Request.ParseMultipartForm(1 << 30); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Error processing form"})
	// 	c.Abort()
	// 	return
	// }

	// //Get the episode file
	// episodeAudio, err := c.FormFile("episode_audio")
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, "Error obtaining audio")
	// 	return
	// }

	// // Get the other info for episode
	// podcastId, err := strconv.ParseUint(c.PostForm("podcastId"), 10, 64)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, "Error converting podcastId")
	// 	return
	// }

	// //Check if podcast exists
	// var podcast models.Podcast
	// var podcastErr error
	// podcastErr = db.First(&podcast, podcastId).Error
	
	// if podcastErr != nil && err == gorm.ErrRecordNotFound {
	// 	c.JSON(http.StatusBadRequest, "Podcast does not exist!")
	// 	return
	// }

	// // Save file
	// err = c.SaveUploadedFile(episodeAudio, fmt.Sprintf("%s/audios", os.Getenv("CdnLocalPath")))
	// if err != nil {
	// 		c.JSON(http.StatusInternalServerError, "Error storing file")
	// 		return
	// }

	// //Create episode in db
	// episode := models.Episode{PodcastID: uint(podcastId), Url: fmt.Sprintf("%s/audios/%s", os.Getenv("CdnUrlPath"), episodeAudio.Filename)}
	// result := db.Create(&episode)

	// if result.Error != nil {
	// 	c.JSON(http.StatusInternalServerError, "Error creating user")
	// }
}


func (uc *EpisodeController) UpdateEpisode(c *gin.Context) {
   //TODO: Can Edit the name, description, image, etc -> This has not a screen yet
}

func (uc *EpisodeController) DeleteEpisode(c *gin.Context) {
  //TODO: Delete an episode and its segments -> Access if this should be possible after the episode is published
}

func (uc *EpisodeController) RenderEpisode(c *gin.Context) {
	//TODO: Triggered when the users finishes the episode and clicks on render
	//TODO: Also on update, have a function that checks if any segments were changed, and if so, call this endpoint to re-render the episode (Have a function in FE to check if any segments were changed to prevent an overload of unnecessary rerender)
	
	//TODO: Gather all the segments (and it's resources -> only gonna needs the name prob) and send them via rabbitmq to the audio render ms to generate the final audio (a bool flag of noise cancellation should be sent as well)
	//! The Audio Render MS will then store the file and send back its uuid
	//TODO: With the uuid sent back by the Audio Render MS, create the episode in the Database

	//TODO: Get the Podcast of this Episode and check if it has an RSS Feed. 
	//!If it hasn't, generate the RSS Feed.
}

func (uc *EpisodeController) PublishEpisode(c *gin.Context) {
	//TODO: If the podcast already has one RSS Feed and at least one episode, we need to update the RSS Feed with a new episode (It goes for the first place in the metadata)
	//TODO: If the podcast has one RSS Feed, but no episodes, add this as the first one.

	//! Both processes will be similar, if there are 10 or 0 episodes, the new episode to be published will go into the first position of the RSS Feed.
}
