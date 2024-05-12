package controllers

import (
	"net/http"

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