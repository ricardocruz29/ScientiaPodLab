package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)	


func SetupResourceRoutes(r *gin.Engine){
    rc := controllers.NewResourceController()

	resourceRouter := r.Group("/resources")
    {
			resourceRouter.GET("/", middleware.AuthMiddleware(),  func(c *gin.Context) { rc.GetResources(c)})
			resourceRouter.POST("/", middleware.AuthMiddleware(), func(c *gin.Context) {rc.CreateResource(c)})
			resourceRouter.DELETE("/:id", middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) {rc.DeleteResource(c)})
    }
}