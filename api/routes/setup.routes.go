package routes

import (
	"github.com/gin-gonic/gin"
)

//index function to setup all the routes of the API

func SetupRoutes(r *gin.Engine){

	SetupAuthRoutes(r)
	SetupEpisodeRoutes(r)
	SetupPodcastRoutes(r)
	SetupResourceRoutes(r)
	SetupSegmentRoutes(r)
	SetupTemplateRoutes(r)
	SetupUserRoutes(r)
}