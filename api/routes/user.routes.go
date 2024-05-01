package routes

import (
	"github.com/gin-gonic/gin"
)	


func SetupUserRoutes(r *gin.Engine){
    // uc := controllers.NewUserController()

	// userRouter := r.Group("/users")
    // {
    //     userRouter.GET("/", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.GetUsers(c, db)})
    //     userRouter.GET("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.GetUser(c, db)})
    //     userRouter.PUT("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.UpdateUser(c, db)})
    //     userRouter.DELETE("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.DeleteUser(c, db)})
    // }
}