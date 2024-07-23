package main

import (
	"log"
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
        AllowOrigins:     []string{"*"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
        AllowHeaders:     []string{"Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "Cache-Control"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: true,
        MaxAge:           12 * time.Hour,
    }))

     // Get the CDN path from environment variable
     cdnPath := os.Getenv("CDN_LOCAL_PATH")
     if cdnPath == "" {
         log.Fatal("CDN_LOCAL_PATH environment variable is not set")
     }
     r.Static("/cdn", cdnPath)
    
    routes.SetupRoutes(r)

    r.Run(":4000")
}


