package events

import (
	"encoding/json"
	"fmt"
	"log"
	"scipodlab_api/models"
)

func SendEpisodeToRender(episode models.Episode, includeNoiseCancellation bool) {
	//! PRINT DATA
	printData, _ := json.Marshal(episode)
	fmt.Println("Received data: ", string(printData))

	//TODO: Gather all the segments and the resource of each segment
	//TODO: Send the paths via rabbitmq to the audio render ms to generate the final audio -> Create a json structure and then do json.marshal and call the function events.sendMessage(queueName, data)
	//TODO: include the bool flag of noise cancellation

	log.Println("include noise cancellation: ", includeNoiseCancellation);
}