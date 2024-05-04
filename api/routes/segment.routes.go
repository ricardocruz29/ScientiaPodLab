package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)	


func SetupSegmentRoutes(r *gin.Engine, manager *manage.Manager, db *gorm.DB){
  // sc := controllers.NewSegmentController()

	// segmentRouter := r.Group("/segments")
  //   {
  //       segmentRouter.GET("/",  middleware.AuthMiddleware(manager), func(c *gin.Context) { sc.GetSegments(c, db)})
  //       segmentRouter.GET("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) { sc.GetSegment(c, db)})
  //       segmentRouter.POST("/",  middleware.AuthMiddleware(manager), func(c *gin.Context) { sc.CreateSegment(c, db)})
  //       segmentRouter.PUT("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) { sc.UpdateSegment(c, db)})
  //       segmentRouter.DELETE("/:id",  middleware.AuthMiddleware(manager), middleware.ValidationMiddleware(nil, &validators.IDParamsValidator{}), func(c *gin.Context) { sc.DeleteSegment(c, db)})
  //   }
}

