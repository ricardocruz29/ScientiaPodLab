package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)	


func SetupEpisodeRoutes(r *gin.Engine, manager *manage.Manager){
    ec := controllers.NewEpisodeController()

	episodeRouter := r.Group("/users")
    {
        episodeRouter.GET("/",  middleware.AuthMiddleware(manager), ec.GetEpisodes)
        episodeRouter.GET("/:id",  middleware.AuthMiddleware(manager), ec.GetEpisode)
        episodeRouter.POST("/",  middleware.AuthMiddleware(manager), ec.CreateEpisode)
        episodeRouter.PUT("/:id",  middleware.AuthMiddleware(manager), ec.UpdateEpisode)
        episodeRouter.DELETE("/:id",  middleware.AuthMiddleware(manager), ec.DeleteEpisode)
    }
}