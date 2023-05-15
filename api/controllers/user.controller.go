package controllers

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserController struct {}

func NewUserController() *UserController {
	return &UserController{}
}

func (uc *UserController) CreateUser(c *gin.Context, db *gorm.DB) {
    
}

func (uc *UserController) GetUsers(c *gin.Context, db *gorm.DB) {
    
}

func (uc *UserController) GetUser(c *gin.Context, db *gorm.DB) {
    
}

func (uc *UserController) UpdateUser(c *gin.Context, db *gorm.DB) {
   
}

func (uc *UserController) DeleteUser(c *gin.Context, db *gorm.DB) {
    
}