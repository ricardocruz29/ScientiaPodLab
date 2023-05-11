package middleware

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4/manage"
)

func AuthMiddleware(manager *manage.Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
			accessToken := c.GetHeader("Authorization")

			//Verify is there is a token
			if accessToken == "" {
				c.AbortWithStatus(http.StatusUnauthorized)
				return
			}

			// Verify the validity of access token
			token, err := manager.LoadAccessToken(context.Background(), accessToken)
			if err != nil || token == nil {
				c.AbortWithStatus(http.StatusUnauthorized)
				return
			}

			//TODO Verify the expires In
			//Interceptor on client will be request to route /refresh to generate a new access Token
			if token.GetAccessExpiresIn() < 1 {
				c.AbortWithStatus(http.StatusUnauthorized)
				return
			}

			userId := token.GetUserID()
			//TODO Get user stored in bd by the UserID
			user := userId
			//TODO When actually have the user, change == "" to == nil
			if user == "" {
				c.AbortWithStatus(http.StatusUnauthorized)
				return
			}

			//Set the user on the context
			c.Set("user", user)

			// If user is authenticated
			c.Next()
	}
}