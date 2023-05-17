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
	CdnPath					string
}

// AppConfig is a global access variable
var AppConfig *Config

// LoadConfig loads the configuration variables from .env file
func LoadConfig() error {
	// load the .env file
	err := godotenv.Load()
	if err != nil {
		return fmt.Errorf("error loading .env file: %v", err)
	}

	// create a new Config struct with the environment variable values
	config := &Config{
		DbUser:     		os.Getenv("DB_USER"),
		DbPassword: 		os.Getenv("DB_PASSWORD"),
		DbHost:     		os.Getenv("DB_HOST"),
		DbPort:     		os.Getenv("DB_PORT"),
		DbName:     		os.Getenv("DB_NAME"),
		ClientId: 			os.Getenv("CLIENT_ID"),
		ClientSecret: 	os.Getenv("CLIENT_SECRET"),
		CdnPath:				os.Getenv("CDN_PATH"),
	}

	//Store the config on global variable
	AppConfig = config

	return nil
}