package models

import "gorm.io/gorm"

type Template struct {
	gorm.Model
	Name			string							`gorm:"not null" json:"name"`
	Duration	string							`gorm:"not null" json:"duration"` //Duration is of type string because this is just an estimate to present "15-30min"
	Genre			string							`gorm:"not null" json:"genre"` //Monologue, Storytelling, Interview, Custom, etc
	Type			string							`gorm:"not null; default:'Platform'" json:"type"` //Either Platform or Custom
	Segments	[]TemplateSegment		`json:"segments"`
	UserID		uint								`gorm:"foreignKey" json:"userId"`
}

func TemplateModel(db *gorm.DB)  {
	db.AutoMigrate(&Template{})
}