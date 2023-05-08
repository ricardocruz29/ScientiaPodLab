package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)


func Connect() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:password@tcp(127.0.0.1:3306)/scientiapodlab_db")
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


