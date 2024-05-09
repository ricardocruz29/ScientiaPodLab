package models

import "gorm.io/gorm"

type Resource struct {
	gorm.Model
	NameCDN		string			`gorm:"not null" json:"cdn_name"`
	Name			string			`gorm:"not null" json:"name"`
	Url				string			`gorm:"not null" json:"url"`
	Type			string			`gorm:"not null; default:'Platform'" json:"type"` //Either Platform or Custom
	UserID		uint				`gorm:"foreignKey" json:"userId"`
}

func ResourceModel(db *gorm.DB)  {
	db.AutoMigrate(&Resource{})
}