package controllers

import (
	"context"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4"
	"github.com/go-oauth2/oauth2/v4/manage"
)

type AuthController struct {}

func NewAuthController() *AuthController {
	return &AuthController{}
}

func (ac *AuthController) Login(c *gin.Context, manager *manage.Manager) {
	username := c.PostForm("username")
	password := c.PostForm("password")

	// Verify User Credentials
	if username == "usuarioteste" && password == "senhateste" {
			//Get current client
			client, err := manager.GetClient(context.Background() ,"client_id")

			if err != nil {
				return
			}

			token, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
				ClientID:     client.GetID(),
				UserID:       username,
			})

			if err != nil {
					return 
			}

			// Define access token as cookie
			c.SetCookie("access_token", token.GetAccess(), 3600, "/", "", false, true)
			c.JSON(http.StatusOK, gin.H{
					"access_token": token.GetAccess(),
					"expires_in":   token.GetAccessExpiresIn(),
			})

	} else {
			
			c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Invalid Credentials",
			})
	}
}

func (ac *AuthController) Register(c *gin.Context) {
    //Similar to login, but instead of verifying existing user credentials, new ones are created.
}
