package events

import "log"

func DeclareQueues() {
	errStart := declareQueue("startRenderEpisode")
	if errStart != nil {
		log.Fatalf("Error declaring start render episode queue: %s", errStart)
	}

	errFinish := declareQueue("finishRenderEpisode")
	if errFinish != nil {
		log.Fatalf("Error declaring finish render episode queue: %s", errFinish)
	}
}