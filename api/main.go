package main

import (
	"os"
	"scipodlab_api/database"
	"scipodlab_api/initializers"
	"scipodlab_api/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
    initializers.LoadEnvVariables()
    initializers.ConnectToDB()
    initializers.SyncDatabase()
    initializers.ConnectToRabbitMQ()

    initializers.StartEvents()
   
    
    //! To run with seeding: go run . seed
    if (len(os.Args) > 1 && os.Args[1] == "seed") {
        database.ClearAllTables()
        database.MigrateAllTables()
        database.SeedAllTables()
    }
}

func main(){	
    //Execute HTTP Server
    r := gin.Default()

    r.RedirectTrailingSlash = false

    // Configure CORS
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "Cache-Control"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))
    
    routes.SetupRoutes(r)

    r.Run(":4000")
}


