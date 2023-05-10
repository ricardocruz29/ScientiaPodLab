package utils

import (
	"crypto/rand"
	"encoding/base64"
)

func GenerateRandomToken() string {
	tokenSize := 32

	// Create Bytes Slice same size as token
	tokenBytes := make([]byte, tokenSize)

	_, err := rand.Read(tokenBytes)
	if err != nil {
		return ""
	}

	// Create Token
	token := base64.URLEncoding.EncodeToString(tokenBytes)

	return token
}