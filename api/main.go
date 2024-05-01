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
	

    //oauth2
    // manager := manage.NewDefaultManager()
    // manager.MustTokenStorage(store.NewMemoryTokenStore())

    // clientStore := store.NewClientStore()
    // clientStore.Set(config.AppConfig.ClientId, &models.Client{
    //     ID: config.AppConfig.ClientId,
    //     Secret: config.AppConfig.ClientSecret,
    //     Domain: "http://localhost:9094",
    // })

    // manager.MapClientStorage(clientStore)

    // srv := server.NewServer(server.NewConfig(), manager)
    // srv.SetAllowGetAccessRequest(true)
    // srv.SetClientInfoHandler(server.ClientFormHandler)

    // srv.SetInternalErrorHandler(func(err error) (re *errors.Response) {
    //     log.Println("Internal Error:", err.Error())
    //     return
    // }) 

    // srv.SetResponseErrorHandler(func(re *errors.Response) {
    //     log.Println("Response Error:", re.Error.Error())
    // })


    //Execute HTTP Server
    r := gin.Default()
    routes.SetupRoutes(r)

    r.Run(":4000")
}


