package models

import "gorm.io/gorm"

type Segment struct {
	gorm.Model
	Position				int							`gorm:"not null; default = 0" json:"position"`
	EpisodeID				uint						`gorm:"foreignKey" json:"episodeId"`
	TemplateID			uint						`gorm:"foreignKey" json:"templateId"`
	ContentSegment	ContentSegment 	
	TTSSegment			TTSSegment 			
	ResourceSegment	ResourceSegment 	
}

type ContentSegment struct {
	gorm.Model
	Name				string	`json:"name"`
	Url 				string	`json:"url"`
	SegmentId 	uint		`gorm:"foreignKey" json:"segmentID"`	
}

type TTSSegment struct {
	gorm.Model
	Name				string	`json:"name"`
	Url 				string	`json:"url"`
	Text 				string	`json:"text"`
	SegmentId 	uint		`gorm:"foreignKey" json:"userId"`	
}

type ResourceSegment struct {
	gorm.Model
	Name				string	`json:"name"`
	Url 				string	`json:"url"`
	SegmentId 	uint		`gorm:"foreignKey" json:"userId"`	
}

func SegmentModel(db *gorm.DB)  {
	db.AutoMigrate(&Segment{})
	db.AutoMigrate(&ContentSegment{})
	db.AutoMigrate(&TTSSegment{})
	db.AutoMigrate(&ResourceSegment{})
}