package events

import (
	"encoding/json"
	"fmt"
	"log"
)

// Define a struct to represent the data that will be sent
type RabbitMQData struct {
	Resources            []string 	`json:"resources"`
	EpisodeID						 int			`json:"episodeId"`							
	NoiseCancellation 	 string     `json:"noiseCancellation"`
}

func SendEpisodeToRender(resources []string, includeNoiseCancellation string, episodeId int) {
	//! PRINT DATA
	printData, _ := json.Marshal(resources)
	fmt.Println("Send Episode to Render: ", string(printData))

	// Create an instance of MyObject
	data := RabbitMQData{
		Resources: resources,
		NoiseCancellation: includeNoiseCancellation,
		EpisodeID: episodeId,
	}

	// Marshal struct to JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		log.Fatalf("Error marshalling JSON: %s", err)
	}

	sendMessage("startRenderEpisode", jsonData)
}