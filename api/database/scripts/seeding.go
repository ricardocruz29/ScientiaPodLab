package database

import (
	"log"
	"scipodlab_api/config"
	"scipodlab_api/database"
	"scipodlab_api/models"

	"gorm.io/gorm"
)

func SeedAllTables() {
	//Load .env
	err := config.LoadConfig()
	if err != nil {
		log.Fatalf("error loading config: %s", err)
	}

	//Connect to db
	db, err := database.Connect(
			config.AppConfig.DbUser,
			config.AppConfig.DbPassword,
			config.AppConfig.DbHost,
			config.AppConfig.DbPort,
			config.AppConfig.DbName,
	)

	if err != nil {
			log.Fatal("Error connecting database")
	}

	// Execute seeding
	seedUsers(db)
	seedPodcasts(db)
	seedEpisodes(db)

	log.Println("Seeding done!")

}

func seedUsers(db *gorm.DB) {
	users := []models.User{
		{Username: "ricardo", Email: "ricardo@gmail.com"},
		{Username: "joão", Email: "joao@gmail.com"},
		{Username: "pedro", Email: "pedro@gmail.com"},
	}

	// Insert in db
	for _, user := range users {
		err := db.Create(&user).Error
		if err != nil {
			log.Printf("Error seeding users: %s", err)
		}
	}
}

func seedPodcasts(db *gorm.DB) {
	podcasts := []models.Podcast{
		{Name: "Podcast fixe", Image: "aisjdhaksjhdakjshd", UserID: 1},
		{Name: "brutal", Image: "ymnasdkjhkiwuhkjhw", UserID: 2},
		{Name: "top", Image: "kjhoase,mnqweamnqa", UserID: 2},
		{Name: "lindo", Image: "asdlnqwlkenlknalkn", UserID: 3},
		{Name: "fixe", Image: "lmasdoqwehnbasodih", UserID: 3},
	}

	// Insert in db
	for _, podcast := range podcasts {
		err := db.Create(&podcast).Error
		if err != nil {
			log.Printf("Error seeding podcasts: %s", err)
		}
	}
}

func seedEpisodes(db *gorm.DB) {
	episodes := []models.Episode{
		{Url: "https://teste1.com", PodcastID: 1},
		{Url: "https://asdasdasdasdasd.com", PodcastID: 1},
		{Url: "https://qweqweqweqwe.com", PodcastID: 1},
		{Url: "https://asldkjlkqwe.com", PodcastID: 2},
		{Url: "https://dlsakmnvoihasd.com", PodcastID: 2},
		{Url: "https://asdlknqwleknaslkdnqwe.com", PodcastID: 3},
		{Url: "https://asdkqnjwekjn.com", PodcastID: 3},
		{Url: "https://ioqwoieumqwelkn.com", PodcastID: 4},
		{Url: "https://asdoqwieaosihdqowej.com", PodcastID: 4},
		{Url: "https://asdknqwleknlkasndlkqnwe.com", PodcastID: 5},
	}

	// Insert in db
	for _, episode := range episodes {
		err := db.Create(&episode).Error
		if err != nil {
			log.Printf("Error seeding episodes: %s", err)
		}
	}
}