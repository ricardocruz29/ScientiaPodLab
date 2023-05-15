package models

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID 						uint			`gorm:"primaryKey" json:"id"` 
	Username			string		`json:"username"`
	Email					string		`json:"email"`
	Password			string		`json:"password"`
	CreatedAt 		time.Time	`json:"createdAt"`
	UpdatedAt 		time.Time	`json:"updatedAt"`
	Podcasts			[]Podcast	`json:"podcasts"`
	RefreshToken	string		`json:"refreshToken"`
}


func UserModel(db *gorm.DB) {
	db.AutoMigrate(&User{})
}