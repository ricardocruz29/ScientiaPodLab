package database

import (
	"log"
	"scipodlab_api/models"
)

func SeedAllTables() {
	// Execute seeding
	seedUsers()
	seedPodcasts()
	seedEpisodes()

	log.Println("Seeding done!")

}

func seedUsers() {
	users := []models.User{
		{Username: "ricardo", Email: "ricardo@gmail.com"},
		{Username: "joão", Email: "joao@gmail.com"},
		{Username: "pedro", Email: "pedro@gmail.com"},
	}

	// Insert in db
	for _, user := range users {
		err := DB.Create(&user).Error
		if err != nil {
			log.Printf("Error seeding users: %s", err)
		}
	}
}

func seedPodcasts() {
	podcasts := []models.Podcast{
		{Name: "Podcast fixe", Image: "aisjdhaksjhdakjshd", UserID: 1},
		{Name: "brutal", Image: "ymnasdkjhkiwuhkjhw", UserID: 2},
		{Name: "top", Image: "kjhoase,mnqweamnqa", UserID: 2},
		{Name: "lindo", Image: "asdlnqwlkenlknalkn", UserID: 3},
		{Name: "fixe", Image: "lmasdoqwehnbasodih", UserID: 3},
	}

	// Insert in db
	for _, podcast := range podcasts {
		err := DB.Create(&podcast).Error
		if err != nil {
			log.Printf("Error seeding podcasts: %s", err)
		}
	}
}

func seedEpisodes() {
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
		err := DB.Create(&episode).Error
		if err != nil {
			log.Printf("Error seeding episodes: %s", err)
		}
	}
}