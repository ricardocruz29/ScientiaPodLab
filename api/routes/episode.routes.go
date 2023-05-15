package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)	


func SetupEpisodeRoutes(r *gin.Engine, manager *manage.Manager, db *gorm.DB){
    ec := controllers.NewEpisodeController()

	episodeRouter := r.Group("/users")
    {
        episodeRouter.GET("/",  middleware.AuthMiddleware(manager), func(c *gin.Context) { ec.GetEpisodes(c, db)})
        episodeRouter.GET("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) { ec.GetEpisode(c, db)})
        episodeRouter.POST("/",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(&validators.CreateEpisodeValidator{}, nil), func(c *gin.Context) { ec.CreateEpisode(c, db)})
        episodeRouter.PUT("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(&validators.UpdateEpisodeValidator{}, &validators.IDParamsValidator{}), func(c *gin.Context) { ec.UpdateEpisode(c, db)})
        episodeRouter.DELETE("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) { ec.DeleteEpisode(c, db)})
    }
}

