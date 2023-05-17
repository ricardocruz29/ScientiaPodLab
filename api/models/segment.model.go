package models

import "gorm.io/gorm"

type Segment struct {
	gorm.Model
	ID					uint		`gorm:"primaryKey" json:"id"`
	Path				string	`json:"path"`
	Position		string	`json:"position"`
	Origin			string	`json:"origin"` //jingle, separator, recorded, etc
	EpisodeID		uint		`gorm:"foreignKey" json:"episodeId"`
}

func SegmentModel(db *gorm.DB)  {
	db.AutoMigrate(&Segment{})
}