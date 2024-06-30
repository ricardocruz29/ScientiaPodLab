package initializers

import "scipodlab_api/events"

func StartEvents() {
	events.DeclareQueues()
	go func () {
		events.ConsumeFinishRenderEpisode()
		
		select {} // Keep the application running    
	}()
	
}