package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)	


func SetupPodcastRoutes(r *gin.Engine, manager *manage.Manager, db *gorm.DB){
    pc := controllers.NewPodcastController()

	podcastRouter := r.Group("/users")
    {
        podcastRouter.GET("/", middleware.AuthMiddleware(manager),  func(c *gin.Context) {pc.GetPodcasts(c, db)})
        podcastRouter.GET("/:id", middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) {pc.GetPodcast(c, db)})
        podcastRouter.POST("/", middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(&validators.CreatePodcastValidator{}, nil), func(c *gin.Context) {pc.CreatePodcast(c, db)})
        podcastRouter.PUT("/:id", middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(&validators.UpdateEpisodeValidator{}, &validators.IDParamsValidator{}), func(c *gin.Context) {pc.UpdatePodcast(c, db)})
        podcastRouter.DELETE("/:id", middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) {pc.DeletePodcast(c, db)})
    }
}