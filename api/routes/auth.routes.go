package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)	


func SetupAuthRoutes(r *gin.Engine, manager *manage.Manager){
    ac := controllers.NewAuthController()

	authRouter := r.Group("/")
    {
        authRouter.POST("/login", middleware.ValidationMiddleware(&validators.LoginValidator{}), func(c *gin.Context) { ac.Login(c, manager)	})
        authRouter.POST("/register",middleware.ValidationMiddleware(&validators.LoginValidator{}), func(c *gin.Context) { ac.Register(c, manager)	})
        authRouter.POST("/refresh",func(c *gin.Context) { ac.RefreshToken(c, manager)	})
    }
}