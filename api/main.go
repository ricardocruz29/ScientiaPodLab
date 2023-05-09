package main

import (
	"log"
	"scipodlab_api/config"
	"scipodlab_api/database"
)

// Watch this video to setup better: https://www.youtube.com/watch?v=jFfo23yIWac

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
}

