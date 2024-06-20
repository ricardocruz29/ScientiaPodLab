package initializers

import (
	"log"
	"scipodlab_api/events"
)

func ConnectToRabbitMQ() {
	rabbitmqErr := events.ConnectRabbitmq()
    if rabbitmqErr != nil {
		log.Fatalf("Error connecting to rabbitmq: %s", rabbitmqErr)
	}
}