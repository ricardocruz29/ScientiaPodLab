package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Username			string			`gorm:"unique; not null" json:"username"`
	Email					string			`gorm:"unique; not null" json:"email"`
	Password			string			`gorm:"not null" json:"password"`
	Podcasts			[]Podcast		`json:"podcasts"`
	Resources 		[]Resource	`json:"resources"`
	Templates			[]Template  `json:"templates"`
}

func UserModel(db *gorm.DB) {
	db.AutoMigrate(&User{})
}

