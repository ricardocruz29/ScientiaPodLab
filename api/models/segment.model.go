package models

import "gorm.io/gorm"

type Segment struct {
	gorm.Model
	ID					uint				`gorm:"primaryKey" json:"id"`
	Path				string			`json:"path"`
	Position		int					`json:"position"`
	Origin			string			`json:"origin"` //jingle, separator, recorded, etc
	Episodes		[]*Episode	`gorm:"many2many:episode_segments;" json:"episode_segments"`
}

func SegmentModel(db *gorm.DB)  {
	db.AutoMigrate(&Segment{})
}