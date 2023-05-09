package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)


func Connect(user, password, host, port, name string) (*gorm.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password,host, port, name)


	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		return nil, fmt.Errorf("error connecting to database: %v", err)
	}
	
	
	fmt.Println("Successfully connected to MySQL database!")

	return db, nil
}


