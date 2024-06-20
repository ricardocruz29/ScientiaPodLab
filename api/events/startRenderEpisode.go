package events

import "log"

func StartRenderEpisode() {
	err := declareQueue("startRenderEpisode")
	if err != nil {
		log.Fatalf("Error declaring start render episode queue: %s", err)
	}
}