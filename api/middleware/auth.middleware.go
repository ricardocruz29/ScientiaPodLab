package middleware

import (
	"net/http"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
			token, err := c.Cookie("Authorization")

			//Verify is there is a token
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No token received"})
				return
			}

			// Verify the validity of token
			id, err := utils.VerifyJWTToken(token)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
				return
			}

			// Get the user by the id
			var user models.User
			dbErr := database.DB.First(&user, id).Error
			
			if dbErr != nil || user.ID == 0 {
				c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": dbErr.Error()})
				return
			}

			//Set the user on the context
			c.Set("user", user)

			// If user is authenticated
			c.Next()
	}
}