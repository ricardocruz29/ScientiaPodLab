package utils

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashSaltPwd(pwd string) string {
	bytePwd := []byte(pwd)

	hash, err := bcrypt.GenerateFromPassword(bytePwd, bcrypt.DefaultCost)
	if err != nil {
		log.Println(err)
	}

	return string(hash)
}

func CompareHashSaltPwd(hashPwd string, plainPwd string) bool {
	byteHash := []byte(hashPwd)
	bytePlain := []byte(plainPwd)

	err := bcrypt.CompareHashAndPassword(byteHash, bytePlain)
    if err != nil {
        log.Println(err)
        return false
    }

    return true
}