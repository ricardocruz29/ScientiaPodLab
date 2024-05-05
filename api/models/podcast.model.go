package models

import "gorm.io/gorm"


type Podcast struct {
	gorm.Model
	Name 					string			`gorm:"not null" json:"name"`
	Image					string			`gorm:"not null" json:"image"`
	Description		string			`gorm:"not null" json:"description"`
	Genre					string			`gorm:"not null" json:"genre"`
	RSSFeed				string			`json:"rssFeed"`
	Episodes			[]Episode		`json:"episodes"`
	UserID				uint				`gorm:"foreignKey" json:"userId"`	
}

func PodcastModel(db *gorm.DB) {
	db.AutoMigrate(&Podcast{})
}