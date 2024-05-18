package models

import "gorm.io/gorm"

type TemplateSegment struct {
	gorm.Model
	Position				int							`gorm:"not null; default = 0" json:"position"`
	Type						string					`gorm:"not null" json:"type"`
	TemplateID      uint           	`gorm:"foreignKey" json:"templateId"`
}

//!They will be created when the user creates a new episode -> a template will be used, and in the FE the structure of segments must be built as well and sent through the CreateEpisode information {name, image, ..., episodeSegments: []}
type EpisodeSegment struct {
	gorm.Model
	Position				int							`gorm:"not null; default = 0" json:"position"`
	Type						string					`gorm:"not null" json:"type"`
	EpisodeID      	uint           	`gorm:"foreignKey" json:"episodeId"`
	ResourceID			*uint						`gorm:"foreignKey" json:"resourceId"`
}

func SegmentModel(db *gorm.DB)  {
	db.AutoMigrate(&EpisodeSegment{})
	db.AutoMigrate(&TemplateSegment{})
}