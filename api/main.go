package main

import (
	"github.com/ricardocruz29/ScientiaPodLab/api/database"
)

// Watch this video to setup better: https://www.youtube.com/watch?v=jFfo23yIWac

func main(){
	db, err := database.Connect()
    if err != nil {
        panic(err)
    }
    defer db.Close()
}
