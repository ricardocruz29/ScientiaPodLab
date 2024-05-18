package models

import "gorm.io/gorm"

type Resource struct {
	gorm.Model
	NameCDN						string					`gorm:"not null" json:"cdn_name"`
	Name							string					`gorm:"not null" json:"name"`
	Url								string					`gorm:"not null" json:"url"`
	Type							string					`gorm:"not null; default:'Platform'" json:"type"` //Either Platform or Custom
	TypeSegment				string					`gorm:"not null" json:"type_segment"` //Either Content, TTS or Sound Effect/Jingle
	Text							string					`json:"text"` //If typeSegment is TTS, then we store the text
	EpisodeSegments		[]EpisodeSegment	`json:"episode_segments"`
	UserID						uint						`gorm:"foreignKey" json:"userId"`
}

func ResourceModel(db *gorm.DB)  {
	db.AutoMigrate(&Resource{})
}