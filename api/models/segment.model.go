package models

import "gorm.io/gorm"

type TemplateSegment struct {
	gorm.Model
	Position				int							`gorm:"not null; default = 0" json:"position"`
	Type						string					`gorm:"not null" json:"type"`
	TemplateID      uint           	`gorm:"foreignKey" json:"templateId"`
}

type EpisodeSegment struct {
	gorm.Model
	Position				int							`gorm:"not null; default = 0" json:"position"`
	ContentSegment	ContentSegment 	
	TTSSegment			TTSSegment 			
	ResourceSegment	ResourceSegment 	
	EpisodeID      	uint           	`gorm:"foreignKey" json:"episodeId"`
}

type ContentSegment struct {
	gorm.Model
	Name							string	`json:"name"`
	Url 							string	`json:"url"`
	EpisodeSegmentId 	*uint		`gorm:"foreignKey" json:"episodeSegmentId"`	
}

type TTSSegment struct {
	gorm.Model
	Name							string	`json:"name"`
	Url 							string	`json:"url"`
	Text 							string	`json:"text"`
	EpisodeSegmentId 	*uint		`gorm:"foreignKey" json:"episodeSegmentId"`	
}

type ResourceSegment struct {
	gorm.Model
	Name							string	`json:"name"`
	Url 							string	`json:"url"`
	EpisodeSegmentId 	*uint		`gorm:"foreignKey" json:"episodeSegmentId"`	
}

func SegmentModel(db *gorm.DB)  {
	db.AutoMigrate(&EpisodeSegment{})
	db.AutoMigrate(&TemplateSegment{})
	db.AutoMigrate(&ContentSegment{})
	db.AutoMigrate(&TTSSegment{})
	db.AutoMigrate(&ResourceSegment{})
}