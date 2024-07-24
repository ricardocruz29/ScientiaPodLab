package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)	


func SetupTemplateRoutes(r *gin.Engine){
    tc := controllers.NewTemplateController()

	templateRouter := r.Group("/templates")
    {
			templateRouter.GET("/", middleware.AuthMiddleware(),  func(c *gin.Context) { tc.GetTemplates(c)})
			templateRouter.GET("/:id",  middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) { tc.GetTemplate(c)})
			templateRouter.POST("/", middleware.AuthMiddleware(), middleware.ValidationMiddleware(validators.CreateTemplateValidator{}, nil) , func(c *gin.Context) {tc.CreateTemplate(c)})
			templateRouter.PUT("/:id", middleware.AuthMiddleware(), middleware.ValidationMiddleware(validators.UpdateTemplateValidator{}, validators.IDParamsValidator{}), func(c *gin.Context) {tc.UpdateTemplate(c)})
			templateRouter.DELETE("/:id", middleware.AuthMiddleware(), middleware.ValidationMiddleware(nil, validators.IDParamsValidator{}), func(c *gin.Context) {tc.DeleteTemplate(c)})
    
		}
}