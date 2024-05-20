package validators

type CreateTemplateSegmentValidator struct {
	Position 			int 										`json:"position" validate:"required"`
	Type 					string 									`json:"type" validate:"required"`
	TemplateID		int										`json:"templateId" validate:"required"`
}

type CreateEpisodeSegmentValidator struct {
	Position 			int 										`json:"position" validate:"required"`
	Type 					string 									`json:"type" validate:"required"`
	EpisodeID			int										`json:"episodeId" validate:"required"`
}