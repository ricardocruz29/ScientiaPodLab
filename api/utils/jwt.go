package utils

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

func CreateJWTToken(id uint, username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": id,
		"username": username,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	// Sign the token with the JWT secret key
	key := []byte(os.Getenv("JWT_SECRET"))

	tokenString, err := token.SignedString(key)

	if err != nil {
		log.Println("Error: ", err.Error())
		return "", err
	}

	return tokenString, nil
}

func VerifyJWTToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		 return os.Getenv("JWT_SECRET"), nil
	})
 
	if err != nil {
		 return err
	}
 
	if !token.Valid {
		 return fmt.Errorf("invalid token")
	}
 
	return nil
}