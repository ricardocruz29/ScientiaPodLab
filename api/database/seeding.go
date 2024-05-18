package database

import (
	"fmt"
	"log"
	"os"
	"scipodlab_api/models"
	"scipodlab_api/utils"

	"github.com/joho/godotenv"
)

func SeedAllTables() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file: %s", err)
	}
	// Execute seeding
	seedUsers()
	// seedPodcasts()
	// seedEpisodes()
	seedResources()
	seedTemplates()

	log.Println("Seeding done!")
}

func seedUsers() {
	users := []models.User{
		{Username: "ricardo", Email: "ricardo@gmail.com", Password: utils.HashSaltPwd("teste")},
		{Username: "joão", Email: "joao@gmail.com", Password: utils.HashSaltPwd("teste")},
		{Username: "pedro", Email: "pedro@gmail.com", Password: utils.HashSaltPwd("teste")},
	}

	// Insert in db
	for _, user := range users {
		err := DB.Create(&user).Error
		if err != nil {
			log.Printf("Error seeding users: %s", err)
		}
	}
}

// func seedPodcasts() {
// 	podcasts := []models.Podcast{
// 		{Name: "Podcast fixe", Image: "aisjdhaksjhdakjshd", UserID: 1},
// 		{Name: "brutal", Image: "ymnasdkjhkiwuhkjhw", UserID: 2},
// 		{Name: "top", Image: "kjhoase,mnqweamnqa", UserID: 2},
// 		{Name: "lindo", Image: "asdlnqwlkenlknalkn", UserID: 3},
// 		{Name: "fixe", Image: "lmasdoqwehnbasodih", UserID: 3},
// 	}

// 	// Insert in db
// 	for _, podcast := range podcasts {
// 		err := DB.Create(&podcast).Error
// 		if err != nil {
// 			log.Printf("Error seeding podcasts: %s", err)
// 		}
// 	}
// }

// func seedEpisodes() {
// 	episodes := []models.Episode{
// 		{Url: "https://teste1.com", PodcastID: 1},
// 		{Url: "https://asdasdasdasdasd.com", PodcastID: 1},
// 		{Url: "https://qweqweqweqwe.com", PodcastID: 1},
// 		{Url: "https://asldkjlkqwe.com", PodcastID: 2},
// 		{Url: "https://dlsakmnvoihasd.com", PodcastID: 2},
// 		{Url: "https://asdlknqwleknaslkdnqwe.com", PodcastID: 3},
// 		{Url: "https://asdkqnjwekjn.com", PodcastID: 3},
// 		{Url: "https://ioqwoieumqwelkn.com", PodcastID: 4},
// 		{Url: "https://asdoqwieaosihdqowej.com", PodcastID: 4},
// 		{Url: "https://asdknqwleknlkasndlkqnwe.com", PodcastID: 5},
// 	}

// 	// Insert in db
// 	for _, episode := range episodes {
// 		err := DB.Create(&episode).Error
// 		if err != nil {
// 			log.Printf("Error seeding episodes: %s", err)
// 		}
// 	}
// }

func seedResources() {
	resources := []models.Resource{
		{ Name: "teste1.mp3", Url: fmt.Sprintf("%s/audios/resources/teste1.mp3", os.Getenv("CDN_URL_PATH")), TypeSegment: "Content", UserID: 90},
		{ Name: "teste2.mp3", Url: fmt.Sprintf("%s/audios/resources/teste2.mp3", os.Getenv("CDN_URL_PATH")), TypeSegment: "TTS", Text: "Teste de texto", UserID: 90},
		{ Name: "teste3.mp3", Url: fmt.Sprintf("%s/audios/resources/teste3.mp3", os.Getenv("CDN_URL_PATH")), TypeSegment: "SoundEffect", UserID: 90},
		{ Name: "teste3.mp3", Url: fmt.Sprintf("%s/audios/resources/teste3.mp3", os.Getenv("CDN_URL_PATH")), Type: "Custom", TypeSegment: "SoundEffect", UserID: 90},
	}

	// Insert in db
	for _, resource := range resources {
		err := DB.Create(&resource).Error
		if err != nil {
			log.Printf("Error seeding resources: %s", err)
		}
	}
}

func seedTemplates() {
	templates := []models.Template{
		{
			Name:      "Interview Template",
			Duration:  "30-45min",
			Genre:     "Interview",
			Segments: []models.TemplateSegment{
				{Position: 1, Type: "Content"},
				{Position: 2, Type: "Intro"},
				{Position: 3, Type: "Outro"},
			},
			UserID: 51,
		},
		{
			Name:      "90 Seconds Template",
			Duration:  "1min30s",
			Genre:     "Monologue",
			Segments: []models.TemplateSegment{
				{Position: 1, Type: "Content"},
				{Position: 2, Type: "Intro"},
				{Position: 3, Type: "Outro"},
			},
			UserID: 51,
		},
	}
	

	// Insert in db
	for _, template := range templates {
		err := DB.Create(&template).Error
		if err != nil {
			log.Printf("Error seeding templates: %s", err)
		}
	}
}