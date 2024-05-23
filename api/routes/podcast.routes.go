package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)	


func SetupPodcastRoutes(r *gin.Engine){
    pc := controllers.NewPodcastController()

	podcastRouter := r.Group("/podcasts")
    {
        podcastRouter.GET("/", middleware.AuthMiddleware(),  func(c *gin.Context) {pc.GetPodcasts(c)})
        podcastRouter.GET("/:id", middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) {pc.GetPodcast(c)})
        podcastRouter.POST("/", middleware.AuthMiddleware(), func(c *gin.Context) {pc.CreatePodcast(c)})
        podcastRouter.PUT("/:id", middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) {pc.UpdatePodcast(c)})
        podcastRouter.DELETE("/:id", middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) {pc.DeletePodcast(c)})
        podcastRouter.GET("/rss/:id", func(c *gin.Context) {pc.GetPodcastRSSFeed(c)})
    }
}