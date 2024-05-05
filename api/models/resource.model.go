package models

import "gorm.io/gorm"

type Resource struct {
	gorm.Model
	Url				string			`gorm:"not null" json:"url"`
	Type			string			`gorm:"not null" json:"type"` //Either Platform or Custom
	UserID		uint				`gorm:"foreignKey" json:"userId"`
}

func ResourceModel(db *gorm.DB)  {
	db.AutoMigrate(&Resource{})
}