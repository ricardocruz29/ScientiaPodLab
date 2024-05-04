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
        // userRouter.PUT("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.UpdateUser(c, db)})
        // userRouter.DELETE("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.DeleteUser(c, db)})
    }
}