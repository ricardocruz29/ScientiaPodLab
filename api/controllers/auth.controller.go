package controllers

import (
	"net/http"
	"scipodlab_api/database"
	"scipodlab_api/models"
	"scipodlab_api/utils"
	"scipodlab_api/utils/validators"

	"github.com/gin-gonic/gin"
)

type AuthController struct {}

func NewAuthController() *AuthController {
	return &AuthController{}
}
			
func (ac *AuthController) Login(c *gin.Context) {
	//Get the info from payload
	payload, _ := c.Get("payload")
	info, _ := payload.(*validators.LoginValidator)

	username := info.Username
	password := info.Password

	//Get user stored in db trough username
	var user models.User
	err := database.DB.Where("username = ?", username).First(&user).Error

	if err != nil {
    // Handle the error, such as returning an error response
    c.JSON(http.StatusUnauthorized, "Invalid Credentials")
    return
}

	hashPassword := user.Password 

	// Verify User Credentials
	if utils.CompareHashSaltPwd(hashPassword, password) {
		//Generate JWT
		token, err := utils.CreateJWTToken(user.ID, user.Username)
		if err != nil {
			// c.JSON(http.StatusInternalServerError, gin.H{
			// 	"error": "Error generating token",
			// })
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})

			return
		}

		c.SetSameSite(http.SameSiteLaxMode)
		c.SetCookie("Authorization", token, 3600*24, "", "", false, true)
		c.JSON(http.StatusOK, gin.H{})

	} else {
			c.JSON(http.StatusUnauthorized, gin.H{
					"error": "Invalid Credentials",
			})
	}
}

func (ac *AuthController) Register(c *gin.Context) {
	//Get the info from payload
	payload, _ := c.Get("payload")
	info := payload.(*validators.RegisterValidator)

	user := models.User{Email: info.Email, Password: utils.HashSaltPwd(info.Password), Username: info.Username}
	result := database.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, "Error creating user")
		return
	}

	//Generate JWT
	token, err := utils.CreateJWTToken(user.ID, user.Username)
	if err != nil {
		// c.JSON(http.StatusInternalServerError, gin.H{
		// 	"error": "Error generating token",
		// })
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("Authorization", token, 3600*24, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{})
}