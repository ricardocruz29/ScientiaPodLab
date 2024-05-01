package routes

import (
	"github.com/gin-gonic/gin"
)	


func SetupEpisodeRoutes(r *gin.Engine){
    // ec := controllers.NewEpisodeController()

	// episodeRouter := r.Group("/episodes")
    // {
    //     episodeRouter.GET("/",  middleware.AuthMiddleware(manager), func(c *gin.Context) { ec.GetEpisodes(c, db)})
    //     episodeRouter.GET("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { ec.GetEpisode(c, db)})
    //     episodeRouter.POST("/",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(validators.CreateEpisodeValidator{}, nil), func(c *gin.Context) { ec.CreateEpisode(c, db)})
    //     episodeRouter.PUT("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(validators.UpdateEpisodeValidator{}, &validators.IDParamsValidator{}), func(c *gin.Context) { ec.UpdateEpisode(c, db)})
    //     episodeRouter.DELETE("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { ec.DeleteEpisode(c, db)})
    // }
}

