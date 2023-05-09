package models

import "gorm.io/gorm"


type Podcast struct {
	gorm.Model
	ID				uint				`gorm:"primaryKey" json:"id"`
	Name 			string			`json:"name"`
	Image			string			`json:"image"`
	Episodes	[]Episode		`json:"episodes"`
	UserID		uint				`gorm:"foreignKey" json:"userId"`	
}

func PodcastModel(db *gorm.DB) {
	db.AutoMigrate(&Podcast{})
}