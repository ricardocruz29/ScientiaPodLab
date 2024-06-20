package events

import (
	"fmt"
	"log"
	"os"

	"github.com/streadway/amqp"
)

var RabbitMQChannel *amqp.Channel

func ConnectRabbitmq() error {
	conn, err := amqp.Dial(
		fmt.Sprintf(
			"amqp://%s:%s@%s:%s",
			os.Getenv("RABBITMQ_USER"), os.Getenv("RABBITMQ_PASSWORD"), os.Getenv("RABBITMQ_HOST"), os.Getenv("RABBITMQ_PORT"),
		),
	)
    if err != nil {
        log.Fatalf("Error connecting to rabbitmq: %s", err)
				return err
    }
	defer conn.Close()

	// opening a channel to our RabbitMQ instance over
	// the connection we have already established
	RabbitMQChannel, err = conn.Channel()
	if err != nil {
			log.Fatalf("Error opening a new channel on rabbitmq: %s", err)
			return err
	}
	defer RabbitMQChannel.Close()

	return nil
}

func declareQueue(queueName string) error {
	_, err := RabbitMQChannel.QueueDeclare(
		queueName,
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return err
	}

	return nil
}

func consumeQueue(queueName string) error {
	_, err := RabbitMQChannel.Consume(
		queueName, // queue name
		"",                    // consumer
		true,                  // auto-ack
		false,                 // exclusive
		false,                 // no local
		false,                 // no wait
		nil,                   // arguments
	)
	if err != nil {
		return err
	}

	return nil
}

func sendMessage(queueName string, message []byte) error {
	err := RabbitMQChannel.Publish(
		"",
		queueName,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        message,
		},
	)
	if err != nil {
		return err
	}

	return nil
}