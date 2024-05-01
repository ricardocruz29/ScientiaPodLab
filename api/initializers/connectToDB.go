package initializers

import "scipodlab_api/database"



func ConnectToDB() {
	database.Connect()
}