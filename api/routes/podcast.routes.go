package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)	


func SetupPodcastRoutes(r *gin.Engine, manager *manage.Manager){
    pc := controllers.NewPodcastController()

	podcastRouter := r.Group("/users")
    {
        podcastRouter.GET("/", middleware.AuthMiddleware(manager),  pc.GetPodcasts)
        podcastRouter.GET("/:id", middleware.AuthMiddleware(manager), pc.GetPodcast)
        podcastRouter.POST("/", middleware.AuthMiddleware(manager), pc.CreatePodcast)
        podcastRouter.PUT("/:id", middleware.AuthMiddleware(manager), pc.UpdatePodcast)
        podcastRouter.DELETE("/:id", middleware.AuthMiddleware(manager), pc.DeletePodcast)
    }
}