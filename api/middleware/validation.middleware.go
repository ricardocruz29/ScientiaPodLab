package middleware

import (
	"encoding/json"
	"fmt"
	"net/http"
	"reflect"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func ValidationMiddleware(bodyValidationStruct interface{}, paramsValidationStruct interface{}) gin.HandlerFunc {
	return func(c *gin.Context) {

		if bodyValidationStruct != nil {
			if err := validateRequestBody(c, bodyValidationStruct); err != nil {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
		}

		if paramsValidationStruct != nil {
			if err := validateUriParams(c, paramsValidationStruct); err != nil {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
		}

		c.Next()
	}
}

//auxiliary function to bindJSON and then send data to function validateData 
func validateRequestBody(c *gin.Context, validationStruct interface{}) error {
	dataType := reflect.TypeOf(validationStruct)
	newData := reflect.New(dataType).Interface()

	if err := c.ShouldBindJSON(newData); err != nil {		
		return err
	}

	//! Print the data
	printData, _ := json.Marshal(newData)
	fmt.Println("Validate Request Body: ", string(printData))

	if err := validateData(newData); err != nil {
		return err
	}

	c.Set("payload", newData)
	return nil
}

//auxiliary function to bindUri and then send data to function validateData 
func validateUriParams(c *gin.Context, validationStruct interface{}) error {
	dataType := reflect.TypeOf(validationStruct)
	newData := reflect.New(dataType).Interface()

	//! Print the data
	printData, _ := json.Marshal(newData)
	fmt.Println("Validate URL Params: ", string(printData))
	
	if err := c.ShouldBindUri(newData); err != nil {
		return err
	}

	if err := validateData(newData); err != nil {
		return err
	}

	c.Set("params", newData)
	return nil
}


//auxiliary function to validate the structure using the package validator v10
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


