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

			refreshToken, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
				ClientID:     client.GetID(),
				UserID:       username,
				AccessTokenExp: 3600*24*7, //1 week
			})

			if err != nil {
				return 
		}

			token, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
				ClientID:     client.GetID(),
				UserID:       username,
				AccessTokenExp: 3600*2, //2 hours
				Refresh: refreshToken.GetAccess(),
			})

			if err != nil {
					return 
			}

			// Define access token as cookie
			c.SetCookie("access_token", token.GetAccess(), 3600, "/", "", false, true) //not sure what to define as max age
			c.SetCookie("refresh_token", token.GetRefresh(), 3600, "/", "", false, true) //not sure what to define as max age
			c.JSON(http.StatusOK, gin.H{
					"access_token": token.GetAccess(),
					"refresh_token": refreshToken.GetAccess(),
					"expires_in":   token.GetAccessExpiresIn(),
			})

	} else {
			
			c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Invalid Credentials",
			})
	}
}

func (ac *AuthController) Register(c *gin.Context, manager *manage.Manager) {
    //Similar to login, but instead of verifying existing user credentials, new ones are created.
}

func (ac *AuthController) RefreshToken(c *gin.Context, manager *manage.Manager) {
	refreshToken := c.PostForm("refresh_token")

	//Verify the expires in of refresh token.
	//Verify if refresh is associated with a certain user -> store this attribute in bd


	// Generate new access token
	newToken, err := manager.RefreshAccessToken(context.Background(), &oauth2.TokenGenerateRequest{
		AccessTokenExp: 3600*2,
		Refresh: refreshToken,
	})

	if err != nil {
		return
	}

	// Define new access token
	c.SetCookie("access_token", newToken.GetAccess(), 3600, "/", "", false, true)
	c.JSON(http.StatusOK, gin.H{
		"access_token": newToken.GetAccess(),
		"expires_in":   newToken.GetAccessExpiresIn(),
	})
}