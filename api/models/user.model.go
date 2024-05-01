package models

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID 						uint			`gorm:"primaryKey" json:"id"` 
	Username			string		`gorm:"unique" json:"username"`
	Email					string		`gorm:"unique" json:"email"`
	Password			string		`json:"password"`
	Podcasts			[]Podcast	`json:"podcasts"`
}

func UserModel(db *gorm.DB) {
	db.AutoMigrate(&User{})
}