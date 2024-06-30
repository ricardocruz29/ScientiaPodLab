package events

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"scipodlab_api/database"
	"scipodlab_api/models"
)

// Define a struct to represent the data that will be sent
type FinishRenderEpisodeData struct {
	AudioPath            	string 	`json:"audio_path"`
	EpisodeId 	 					int  		`json:"episode_id"`
}

func ConsumeFinishRenderEpisode() {
	go func() {
		msgs, errConsume := consumeQueue("finishRenderEpisode")
		if errConsume != nil {
			log.Fatalf("Error consuming episode render queue: %s", errConsume)
		}

	
		for msg := range msgs {
			var renderedEpisode FinishRenderEpisodeData
			err := json.Unmarshal(msg, &renderedEpisode)
			if err != nil {
				log.Printf("Failed to unmarshal message: %v", err)
				continue
			}

			// Process the data
			fmt.Printf("Received message: %+v\n", renderedEpisode.AudioPath)

			var episode models.Episode
			// Retrieve the Episode by its ID
			episodeErr := database.DB.First(&episode, renderedEpisode.EpisodeId).Error
			if episodeErr != nil {
				log.Printf("Error getting episode: %v", episodeErr.Error())
				continue
			}

			episode.Url = filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", renderedEpisode.AudioPath)
			// Update the episode in DB
			err = database.DB.Save(&episode).Error
			if err != nil {
				log.Printf("Error updating episode: %v", episodeErr)
			}
		}
	}()
}