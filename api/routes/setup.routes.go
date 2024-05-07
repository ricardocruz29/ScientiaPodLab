package routes

import (
	"github.com/gin-gonic/gin"
)

//index function to setup all the routes of the API

func SetupRoutes(r *gin.Engine){

	SetupAuthRoutes(r)
	SetupUserRoutes(r)
	SetupPodcastRoutes(r)
	SetupEpisodeRoutes(r)
	SetupResourceRoutes(r)
}