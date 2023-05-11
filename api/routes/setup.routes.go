package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)	


func SetupRoutes(r *gin.Engine, manager *manage.Manager){

	SetupAuthRoutes(r, manager)
	SetupUserRoutes(r, manager)
	SetupPodcastRoutes(r, manager)
	SetupEpisodeRoutes(r, manager)
	
}