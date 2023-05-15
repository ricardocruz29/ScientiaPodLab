package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)

//index function to setup all the routes of the API

//TODO NEED TO PASS RECEIVE DB HERE TO SEND IT TO THE ROUTES AND THEN SEND IT TO THE CONTROLLERS FOR CRUD
func SetupRoutes(r *gin.Engine, manager *manage.Manager, db *gorm.DB){

	SetupAuthRoutes(r, manager, db)
	SetupUserRoutes(r, manager, db)
	SetupPodcastRoutes(r, manager, db)
	SetupEpisodeRoutes(r, manager, db)
	
}