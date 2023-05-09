package routes

import (
	"scipodlab_api/controllers"

	"github.com/gin-gonic/gin"
)	


func SetupEpisodeRoutes(r *gin.Engine){
    ec := controllers.NewEpisodeController()

	episodeRouter := r.Group("/users")
    {
        episodeRouter.GET("/", ec.GetEpisodes)
        episodeRouter.GET("/:id", ec.GetEpisode)
        episodeRouter.POST("/", ec.CreateEpisode)
        episodeRouter.PUT("/:id", ec.UpdateEpisode)
        episodeRouter.DELETE("/:id", ec.DeleteEpisode)
    }
}