package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)	


func SetupUserRoutes(r *gin.Engine, manager *manage.Manager){
    uc := controllers.NewUserController()

	userRouter := r.Group("/users")
    {
        userRouter.GET("/", middleware.AuthMiddleware(manager), uc.GetUsers)
        userRouter.GET("/:id", middleware.AuthMiddleware(manager), uc.GetUser)
        userRouter.POST("/", middleware.AuthMiddleware(manager), uc.CreateUser)
        userRouter.PUT("/:id", middleware.AuthMiddleware(manager), uc.UpdateUser)
        userRouter.DELETE("/:id", middleware.AuthMiddleware(manager), uc.DeleteUser)
    }
}