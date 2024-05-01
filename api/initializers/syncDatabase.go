package initializers

import "scipodlab_api/database"

func SyncDatabase() {
	database.MigrateAllTables()
}