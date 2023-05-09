package routes

import (
	"scipodlab_api/controllers"

	"github.com/gin-gonic/gin"
)	


func SetupPodcastRoutes(r *gin.Engine){
    pc := controllers.NewPodcastController()

	podcastRouter := r.Group("/users")
    {
        podcastRouter.GET("/", pc.GetPodcasts)
        podcastRouter.GET("/:id", pc.GetPodcast)
        podcastRouter.POST("/", pc.CreatePodcast)
        podcastRouter.PUT("/:id", pc.UpdatePodcast)
        podcastRouter.DELETE("/:id", pc.DeletePodcast)
    }
}