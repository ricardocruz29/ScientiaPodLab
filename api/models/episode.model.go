package models

import "gorm.io/gorm"

type Episode struct {
	gorm.Model
	Name 					string							`gorm:"not null" json:"name"`
	Image					string							`gorm:"not null" json:"image"`
	Description		string							`gorm:"not null" json:"description"`
	Url						string							`json:"url"`
	Duration			float64							`json:"duration"`
	IsPublished		bool								`gorm:"not null; default:false" json:"isPublished"`
	Segments			[]EpisodeSegment		`json:"segments"`
	PodcastID			uint								`gorm:"foreignKey" json:"podcastId"`
	TemplateID 		uint								`gorm:"foreignKey" json:"templateId"`
}

func EpisodeModel(db *gorm.DB)  {
	db.AutoMigrate(&Episode{})
}