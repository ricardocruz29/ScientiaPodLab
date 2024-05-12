package validators

import "scipodlab_api/models"

type CreateTemplateValidator struct {
	Name 			string 										`json:"name" validate:"required"`
	Duration 	string 										`json:"duration" validate:"required"`
	Genre			string										`json:"genre" validate:"required"`
	Segments	[]models.TemplateSegment	`json:"segments" validate:"required"`
}

type UpdateTemplateValidator struct {
	Name 			*string 										`json:"name,omitempty"`
	Duration 	*string 										`json:"duration,omitempty"`
	Genre			*string											`json:"genre,omitempty"`
	Segments	*[]models.TemplateSegment		`json:"segments,omitempty"`
}