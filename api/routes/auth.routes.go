package routes

import (
	"scipodlab_api/controllers"
	"scipodlab_api/middleware"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)	


func SetupAuthRoutes(r *gin.Engine, manager *manage.Manager, db *gorm.DB){
    ac := controllers.NewAuthController()

	authRouter := r.Group("/")
    {
        authRouter.POST("/login", middleware.ValidationMiddleware(&validators.LoginValidator{}, nil), func(c *gin.Context) { ac.Login(c, manager, db)	})
        authRouter.POST("/register", middleware.ValidationMiddleware(&validators.LoginValidator{}, nil), func(c *gin.Context) { ac.Register(c, manager, db)	})
        authRouter.POST("/refresh",func(c *gin.Context) { ac.RefreshToken(c, manager, db)	})
    }
}