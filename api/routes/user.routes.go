package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"

	"github.com/gin-gonic/gin"
)	


func SetupUserRoutes(r *gin.Engine){
    uc := controllers.NewUserController()

	userRouter := r.Group("/user")
    {
        userRouter.GET("/", middleware.AuthMiddleware(), func(c *gin.Context) {uc.GetUser(c)})
        userRouter.PUT("/disable-onboarding", middleware.AuthMiddleware(), func(c *gin.Context) {uc.DisableOnboarding(c)})
    }
}