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

// SimplifiedEpisodeSegment struct defines a simplified version of EpisodeSegment model, used to update the overall struct of episode segments
type SimplifiedEpisodeSegment struct {
	ID         *int   `json:"id"`
	Type       string `json:"type" validate:"required"`
	ResourceID *int   `json:"resourceId"`
}

// UpdateEpisodeSegmentsValidator define a estrutura de validação para atualizar os segmentos do episódio
type UpdateEpisodeSegmentsValidator struct {
	Segments []SimplifiedEpisodeSegment `json:"segments" validate:"required"`
}