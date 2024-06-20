package events

import "log"

func FinishRenderEpisode() {
	err := consumeQueue("finishRenderEpisode")
	if err != nil {
		log.Fatalf("Error consuming episode render queue: %s", err)
	}

	//! The Audio Render MS will then store the file and send back its uuid and the duration
	//TODO: From the message, get the episode, the id that was generated and save it to the db
	// fileName := "MOCK_FINAL_FILENAME.mp3"
	// duration := 37.3 //in seconds
	

	// episode.Url = filepath.Join(os.Getenv("CDN_URL_PATH"), "audios/resources", fileName)
	// episode.Duration = duration
	// // Update the episode in DB
	// err = database.DB.Save(&episode).Error
}