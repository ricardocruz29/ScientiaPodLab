package models

import "gorm.io/gorm"

type Episode struct {
	gorm.Model
	ID				uint		`gorm:"primaryKey" json:"id"` 
	Url				string	`json:"url"`
	PodcastID	uint		`gorm:"foreignKey" json:"podcastId"`
}

func EpisodeModel(db *gorm.DB)  {
	db.AutoMigrate(&Episode{})
}