package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)	


func SetupEpisodeRoutes(r *gin.Engine){
    ec := controllers.NewEpisodeController()

	episodeRouter := r.Group("/episodes")
    {
        episodeRouter.GET("podcast/:id/",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}) ,  func(c *gin.Context) { ec.GetPodcastEpisodes(c)})
        episodeRouter.GET("/:id",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { ec.GetEpisode(c)})
        episodeRouter.POST("/",  middleware.AuthMiddleware(), func(c *gin.Context) { ec.CreateEpisode(c)})
        episodeRouter.PUT("/:id",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { ec.UpdateEpisode(c)})
        episodeRouter.DELETE("/:id",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { ec.DeleteEpisode(c)})
        episodeRouter.POST("/:id/publish",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { ec.PublishEpisode(c)})
        episodeRouter.POST("/:id/render",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(validators.RenderEpisodeValidator{}, validators.IDParamsValidator{}), func(c *gin.Context) { ec.RenderEpisode(c)})
    }
}

