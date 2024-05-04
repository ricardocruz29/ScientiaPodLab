package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)	


func SetupAuthRoutes(r *gin.Engine){
    ac := controllers.NewAuthController()

	authRouter := r.Group("/")
    {
        authRouter.POST("/login", middleware.ValidationMiddleware(validators.LoginValidator{}, nil), func(c *gin.Context) { ac.Login(c)	})
        authRouter.POST("/register", middleware.ValidationMiddleware(validators.RegisterValidator{}, nil), func(c *gin.Context) { ac.Register(c)	})
    }
}