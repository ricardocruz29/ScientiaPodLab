package middleware

import (
	"fmt"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func ValidationMiddleware(validationStruct interface{}) gin.HandlerFunc {
	return func(c *gin.Context) {
		dataType := reflect.TypeOf(validationStruct) //define the dataType as the one passed in the validation middleware argument
		newData := reflect.New(dataType).Interface() //create the variable with the dataType passed
		
		//Parse the info from json to struct
		if err := c.ShouldBindJSON(newData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		//validate data passed
		if err := validateData(newData); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		
		//Set the payload
		c.Set("payload", newData)

		c.Next()
	}
}


func validateData(data interface{}) error {
	validate := validator.New()
	if err := validate.Struct(data); err != nil {
		var errorMsg string
		for _, err := range err.(validator.ValidationErrors) {
			errorMsg += fmt.Sprintf("Validation error in field '%s': %s\n", err.Field(), err.Tag())
		}
		return fmt.Errorf(errorMsg)
	}
	return nil
}