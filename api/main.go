package main

import (
	"os"
	"scipodlab_api/database"
	"scipodlab_api/initializers"
	"scipodlab_api/routes"

	"github.com/gin-gonic/gin"
)

func init() {
    initializers.LoadEnvVariables()
    initializers.ConnectToDB()
    initializers.SyncDatabase()


    //! To run with seeding: go run . seed
    if (len(os.Args) > 1 && os.Args[1] == "seed") {
        database.ClearAllTables()
        database.MigrateAllTables()
        database.SeedAllTables()
    }
}

func main(){
    // create a new RabbitMQ connection
    //TODO: Do this as a initializer
    // rabbitmqErr := events.ConnectRabbitmq()
    // if rabbitmqErr != nil {
	// 	log.Fatalf("Error connecting to rabbitmq: %s", err)
	// }
	
    //Execute HTTP Server
    r := gin.Default()
    routes.SetupRoutes(r)

    r.Run(":4000")
}


