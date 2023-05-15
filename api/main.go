package main

import (
	"log"
	"scipodlab_api/config"
	"scipodlab_api/database"
	"scipodlab_api/routes"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/errors"
	"github.com/go-oauth2/oauth2/v4/manage"
	"github.com/go-oauth2/oauth2/v4/models"
	"github.com/go-oauth2/oauth2/v4/server"
	"github.com/go-oauth2/oauth2/v4/store"
)

func main(){
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

    //oauth2
    manager := manage.NewDefaultManager()
    manager.MustTokenStorage(store.NewMemoryTokenStore())

    clientStore := store.NewClientStore()
    clientStore.Set(cfg.ClientId, &models.Client{
        ID: cfg.ClientId,
        Secret: cfg.ClientSecret,
        Domain: "http://localhost:9094",
    })

    manager.MapClientStorage(clientStore)

    srv := server.NewServer(server.NewConfig(), manager)
    srv.SetAllowGetAccessRequest(true)
    srv.SetClientInfoHandler(server.ClientFormHandler)

    srv.SetInternalErrorHandler(func(err error) (re *errors.Response) {
        log.Println("Internal Error:", err.Error())
        return
    }) 

    srv.SetResponseErrorHandler(func(re *errors.Response) {
        log.Println("Response Error:", re.Error.Error())
    })


    //Execute HTTP Server
    r := gin.Default()

    routes.SetupRoutes(r, manager, db )

    r.Run(":4000")
}


