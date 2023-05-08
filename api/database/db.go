package database

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)


func Connect(user, password, host, port, name string) (*sql.DB, error) {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password,host, port, name))

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


