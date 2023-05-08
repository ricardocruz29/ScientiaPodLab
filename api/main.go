package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/ricardocruz29/ScientiaPodLab/api/database"
)

// Watch this video to setup better: https://www.youtube.com/watch?v=jFfo23yIWac

func main(){
    //Load .env
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }
  
    //Connect to db
	db, err := database.Connect()
    if err != nil {
        panic(err)
    }
    defer db.Close()
}
