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

func VerifyJWTToken(tokenString string) (interface {}, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %s", token.Header)
		}

		 return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if err != nil {
		return 0, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			return 0, fmt.Errorf("your token has expired");
		} else {

			log.Println("claims['id']: ", claims["id"]);
			log.Println("claims['id']: ", claims["id"]);
			 
			return claims["id"], nil;
		}
	} else {
		return 0, fmt.Errorf("your token is not valid");
	}
}