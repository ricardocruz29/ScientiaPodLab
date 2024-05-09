package database

import (
	"fmt"
	"log"
)

func ClearAllTables() {
	// Get all models defined
	tables := []string{
			// "users", "podcasts", "episodes", "resources",
			"podcasts", "episodes", "resources",
	}

	// Disable Foreign Keys constraints only to be able to delete
	DB.Exec("SET FOREIGN_KEY_CHECKS = 0")
	

	// Iterate the models and delete data
	for _, table := range tables {
			err := DB.Exec(fmt.Sprintf("DELETE FROM %s", table)).Error
			if err != nil {
					log.Fatal(err)
			}
	}

	// Enable foreign keys constraints again
	DB.Exec("SET FOREIGN_KEY_CHECKS = 1")
}