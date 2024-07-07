package controllers

import (
	"net/http"
	"scipodlab_api/database"
	"scipodlab_api/models"

	"github.com/gin-gonic/gin"
)

type UserController struct {}

func NewUserController() *UserController {
	return &UserController{}
}


func (uc *UserController) GetUser(c *gin.Context) {
	user, _ := c.Get("user")

	c.JSON(http.StatusOK, user);
}

func (uc *UserController) DisableOnboarding(c *gin.Context) {
	user, _ := c.Get("user")

	userModel := user.(models.User)
	userModel.ShowOnboarding = false;

	if err := database.DB.Save(&userModel).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Error updating user"})
		return
	}

	c.JSON(http.StatusOK, userModel);
}