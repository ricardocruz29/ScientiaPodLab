package database

import (
	"fmt"
	"log"
	"scipodlab_api/config"
	"scipodlab_api/database"
	"scipodlab_api/models"
)

func MigrateAllTables() {
	//Load .env
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("error loading config: %s", err)
	}

	//Connect to db
	db, err := database.Connect(
			cfg.DbUser,
			cfg.DbPassword,
			cfg.DbHost,
			cfg.DbPort,
			cfg.DbName,
	)

	if err != nil {
			log.Fatal("Error connecting database")
	}

	// Models to be migrated
	models := []interface{}{
		&models.User{},
		&models.Podcast{},
		&models.Episode{},
	}

	// Iterate models and migrate them
	for _, model := range models {
		err := db.AutoMigrate(model)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("Migrated model %T with success!\n", model)
	}
}