package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)	


func SetupUserRoutes(r *gin.Engine, manager *manage.Manager, db *gorm.DB){
    uc := controllers.NewUserController()

	userRouter := r.Group("/users")
    {
        userRouter.GET("/", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.GetUsers(c, db)})
        userRouter.GET("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.GetUser(c, db)})
        userRouter.PUT("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.UpdateUser(c, db)})
        userRouter.DELETE("/:id", middleware.AuthMiddleware(manager), func(c *gin.Context) {uc.DeleteUser(c, db)})
    }
}