package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

// Config struct holds the configuration variables for the application
type Config struct {
	DbUser     			string
	DbPassword 			string
	DbHost     			string
	DbPort     			string
	DbName     			string
	ClientId	 			string
	ClientSecret		string
}

// LoadConfig loads the configuration variables from .env file
func LoadConfig() (*Config, error) {
	// load the .env file
	err := godotenv.Load()
	if err != nil {
		return nil, fmt.Errorf("error loading .env file: %v", err)
	}

	// create a new Config struct with the environment variable values
	config := &Config{
		DbUser:     os.Getenv("DB_USER"),
		DbPassword: os.Getenv("DB_PASSWORD"),
		DbHost:     os.Getenv("DB_HOST"),
		DbPort:     os.Getenv("DB_PORT"),
		DbName:     os.Getenv("DB_NAME"),
		ClientId: 	os.Getenv("CLIENT_ID"),
		ClientSecret: 	os.Getenv("CLIENT_SECRET"),
	}

	return config, nil
}