package initializers

import "scipodlab_api/events"

func StartEvents() {
	events.DeclareQueues()
	events.ConsumeFinishRenderEpisode()
}