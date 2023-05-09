package main

import (
	"log"
	"scipodlab_api/config"
	"scipodlab_api/database"

	"github.com/gin-gonic/gin"
)

func main(){
    //Load .env
    cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("error loading config: %s", err)
	}

    //Connect to db
    database.Connect(
        cfg.DbUser,
        cfg.DbPassword,
        cfg.DbHost,
        cfg.DbPort,
        cfg.DbName,
    )

    //Execute HTTP Server
    r := gin.Default()


    r.Run(":4000")
}

