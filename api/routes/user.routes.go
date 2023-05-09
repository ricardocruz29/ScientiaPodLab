package routes

import (
	"scipodlab_api/controllers"

	"github.com/gin-gonic/gin"
)	


func SetupUserRoutes(r *gin.Engine){
    uc := controllers.NewUserController()

	userRouter := r.Group("/users")
    {
        userRouter.GET("/", uc.GetUsers)
        userRouter.GET("/:id", uc.GetUser)
        userRouter.POST("/", uc.CreateUser)
        userRouter.PUT("/:id", uc.UpdateUser)
        userRouter.DELETE("/:id", uc.DeleteUser)
    }
}