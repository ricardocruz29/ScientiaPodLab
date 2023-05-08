package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)


func Connect() (*sql.DB, error) {
	user := os.Getenv("db_user")
	password := os.Getenv("db_password")
	host := os.Getenv("db_host")
	port := os.Getenv("db_port")
	name := os.Getenv("db_name")


	dbCMD := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password,host, port, name)
	db, err := sql.Open("mysql", dbCMD)
    if err != nil {
			return nil, fmt.Errorf("error connecting to database: %v", err)
    }
    
		if err := db.Ping(); err != nil {
			db.Close()
			return nil, fmt.Errorf("error pinging database: %v", err)
	}

    fmt.Println("Successfully connected to MySQL database!")

		return db, nil
}


