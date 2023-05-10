package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
			// Verify if user is authenticated
			if !true {
					c.AbortWithStatus(http.StatusUnauthorized)
					return
			}

			// If user is authenticated
			c.Next()
	}
}