package database

import (
	"fmt"
	"log"
	"scipodlab_api/config"
	"scipodlab_api/database"
)

func ClearAllTables() {
	//Load .env
	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("error loading config: %s", err)
	}

	//Connect to db
	db, err := database.Connect(
			config.AppConfig.DbUser,
			config.AppConfig.DbPassword,
			config.AppConfig.DbHost,
			config.AppConfig.DbPort,
			config.AppConfig.DbName,
	)

	if err != nil {
			log.Fatal("Error connecting database")
	}

	// Get all models defined
	tables := []string{
			"users", "podcasts", "episodes",
	}

	// Disable Foreign Keys constraints only to be able to delete
	db.Exec("SET FOREIGN_KEY_CHECKS = 0")
	

	// Iterate the models and delete data
	for _, table := range tables {
			err := db.Exec(fmt.Sprintf("DELETE FROM %s", table)).Error
			if err != nil {
					log.Fatal(err)
			}
	}

	// Enable foreign keys constraints again
	db.Exec("SET FOREIGN_KEY_CHECKS = 1")
}