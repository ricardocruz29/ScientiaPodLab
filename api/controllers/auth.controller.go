package controllers

import (
	"context"
	"net/http"
	"scipodlab_api/models"
	"scipodlab_api/utils"
	"scipodlab_api/utils/validators"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-oauth2/oauth2/v4"
	"github.com/go-oauth2/oauth2/v4/manage"
	"gorm.io/gorm"
)

type AuthController struct {}

func NewAuthController() *AuthController {
	return &AuthController{}
}

func (ac *AuthController) Login(c *gin.Context, manager *manage.Manager, db *gorm.DB) {
	//Get the info from payload
	payload, exists := c.Get("payload")
	if !exists {
		c.JSON(http.StatusBadRequest, "Username and password required!")
		return
	}
	
	info, ok := payload.(*validators.LoginValidator)
	if !ok {
		c.JSON(http.StatusBadRequest, "Username and password required!")
		return
	}

	username := info.Username
	password := info.Password

	//Get user stored in db trough username
	var user models.User
	db.Where("username = ?", username).First(&user)

	hashPassword := user.Password 

	// Verify User Credentials
	if utils.CompareHashSaltPwd(hashPassword, password) {
			//Get current client
			client, err := manager.GetClient(context.Background() ,"client_id")

			if err != nil {
				return
			}

			refreshToken, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
				ClientID:     client.GetID(),
				UserID:       username,
				AccessTokenExp: 7 * 24 * time.Hour, //1 week
			})

			if err != nil {
				return 
			}

			user.RefreshToken = refreshToken.GetAccess()
			db.Save(&user)

			token, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
				ClientID:     client.GetID(),
				UserID:       username,
				AccessTokenExp: 2 * time.Hour, //2 hours
			})

			if err != nil {
					return 
			}

			// Define access token as cookie
			c.SetCookie("access_token", token.GetAccess(), 3600*2, "/", "", false, true) //not sure what to define as max age
			c.SetCookie("refresh_token", refreshToken.GetAccess(), 3600*24*7, "/", "", false, true) //not sure what to define as max age
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

func (ac *AuthController) Register(c *gin.Context, manager *manage.Manager, db *gorm.DB) {
		//Get the info from payload
		payload, exists := c.Get("payload")
		if !exists {
			c.JSON(http.StatusBadRequest, "Username, email and password required!")
			return
		}
		
		info, ok := payload.(*validators.RegisterValidator)
		if !ok {
			c.JSON(http.StatusBadRequest, "Username, email and password required!")
			return
		}

		user := models.User{Email: info.Password, Password: utils.HashSaltPwd(info.Password), Username: info.Username}
		result := db.Create(&user)

		if result.Error != nil {
			c.JSON(http.StatusInternalServerError, "Error creating user")
		}

		//Get current client
		client, err := manager.GetClient(context.Background() ,"client_id")

		if err != nil {
			return
		}

		refreshToken, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
			ClientID:     client.GetID(),
			UserID:       user.Username,
			AccessTokenExp: 7 * 24 * time.Hour, //1 week
		})

		if err != nil {
			return 
		}

		user.RefreshToken = refreshToken.GetAccess()
		db.Save(&user)

		token, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
			ClientID:     client.GetID(),
			UserID:       user.Username,
			AccessTokenExp: 2 * time.Hour, //2 hours
		})

		if err != nil {
				return 
		}

		// Define access token as cookie
		c.SetCookie("access_token", token.GetAccess(), 3600*2, "/", "", false, true) //not sure what to define as max age
		c.SetCookie("refresh_token", refreshToken.GetAccess(), 3600*24*7, "/", "", false, true) //not sure what to define as max age
		c.JSON(http.StatusOK, gin.H{
				"access_token": token.GetAccess(),
				"refresh_token": refreshToken.GetAccess(),
				"expires_in":   token.GetAccessExpiresIn(),
		})



}

func (ac *AuthController) RefreshToken(c *gin.Context, manager *manage.Manager, db *gorm.DB) {
	//Get the info from payload
	payload, exists := c.Get("payload")
	if !exists {
		c.JSON(http.StatusBadRequest, "Refresh Token required!")
		return
	}
	
	info, ok := payload.(*validators.RefreshTokenValidator)
	if !ok {
		c.JSON(http.StatusBadRequest, "Refresh Token required!")
		return
	}

	refreshToken := info.RefreshToken

	//TODO Verify the expires in of refresh token.
	//If is expired, send info for client and the user has to be redirected to login so a new refresh token is generated.


	//Get user stored in db trough refresh token
	var user models.User
	var err error

	err = db.Where("refreshToken = ?", refreshToken).First(&user).Error
	
	//If no user is associated, refresh token not valid
	if err != nil && err == gorm.ErrRecordNotFound {
		c.JSON(http.StatusUnauthorized, "Refresh token not valid!")
		return
	}

	//Get current client
	client, err := manager.GetClient(context.Background() ,"client_id")

	if err != nil {
		return
	}

	newRefreshToken, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
		ClientID:     client.GetID(),
		UserID:       user.Username,
		AccessTokenExp: 7 * 24 * time.Hour, //1 week
	})

	if err != nil {
		return 
	}

	user.RefreshToken = newRefreshToken.GetAccess()
	db.Save(&user)

	token, err := manager.GenerateAccessToken(context.Background(), oauth2.PasswordCredentials, &oauth2.TokenGenerateRequest{
		ClientID:     client.GetID(),
		UserID:       user.Username,
		AccessTokenExp: 2 * time.Hour, //2 hours
	})

	if err != nil {
			return 
	}

	// Define access token as cookie
	c.SetCookie("access_token", token.GetAccess(), 3600*2, "/", "", false, true) //not sure what to define as max age
	c.SetCookie("refresh_token", newRefreshToken.GetAccess(), 3600*24*7, "/", "", false, true) //not sure what to define as max age
	c.JSON(http.StatusOK, gin.H{
			"access_token": token.GetAccess(),
			"refresh_token": newRefreshToken.GetAccess(),
			"expires_in":   token.GetAccessExpiresIn(),
	})
}