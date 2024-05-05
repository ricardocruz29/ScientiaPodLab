package database

import (
	"fmt"
	"log"
	"scipodlab_api/models"
)

func MigrateAllTables() {
	// Models to be migrated
	models := []interface{}{
		&models.User{},
		&models.Resource{},
		&models.Template{},
		&models.Podcast{},
		&models.Episode{},
		&models.Segment{},
		&models.ContentSegment{},
		&models.TTSSegment{},
		&models.ResourceSegment{},
	}

	// Iterate models and migrate them
	for _, model := range models {
		err := DB.AutoMigrate(model)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Migrated model %T with success!\n", model)
	}
}