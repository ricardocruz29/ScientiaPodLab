package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)	


func SetupPodcastRoutes(r *gin.Engine, manager *manage.Manager){
    pc := controllers.NewPodcastController()

	podcastRouter := r.Group("/users")
    {
        podcastRouter.GET("/", middleware.AuthMiddleware(manager),  pc.GetPodcasts)
        podcastRouter.GET("/:id", middleware.AuthMiddleware(manager), pc.GetPodcast)
        podcastRouter.POST("/", middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(&validators.CreatePodcastValidator{}), pc.CreatePodcast)
        podcastRouter.PUT("/:id", middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(&validators.UpdateEpisodeValidator{}), pc.UpdatePodcast)
        podcastRouter.DELETE("/:id", middleware.AuthMiddleware(manager), pc.DeletePodcast)
    }
}