package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)	


func SetupSegmentRoutes(r *gin.Engine){
  sc := controllers.NewSegmentController()

	segmentRouter := r.Group("/segments")
    {
      segmentRouter.POST("/template",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(validators.CreateTemplateSegmentValidator{}, nil), func(c *gin.Context) { sc.CreateTemplateSegment(c)})
      segmentRouter.DELETE("/:id/template",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { sc.DeleteTemplateSegment(c)})
      segmentRouter.POST("/episode",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(validators.CreateEpisodeSegmentValidator{}, nil), func(c *gin.Context) { sc.CreateEpisodeSegment(c)})
      segmentRouter.PUT("/:id/episode",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(validators.UpdateEpisodeSegmentsValidator{}, nil), func(c *gin.Context) { sc.UpdateEpisodeSegments(c)})
      segmentRouter.DELETE("/:id/episode",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { sc.DeleteEpisodeSegment(c)})
    }
}

