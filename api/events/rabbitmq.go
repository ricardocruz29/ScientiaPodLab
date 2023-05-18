package events

import (
	"fmt"
	"log"
	"scipodlab_api/config"

	"github.com/streadway/amqp"
)

func ConnectRabbitmq() error {
	conn, err := amqp.Dial(
		fmt.Sprintf(
			"amqp://%s:%s@%s:%s",
			config.AppConfig.RabbitMQUser, config.AppConfig.RabbitMQPassword, config.AppConfig.RabbitMQHost, config.AppConfig.RabbitMQPort,
		),
	)
    if err != nil {
        log.Fatalf("Error connecting to rabbitmq: %s", err)
				return err
    }
	defer conn.Close()

	// opening a channel to our RabbitMQ instance over
	// the connection we have already established
	ch, err := conn.Channel()
    if err != nil {
        log.Fatalf("Error opening a new channel on rabbitmq: %s", err)
				return err
    }
	defer ch.Close()

	return nil
}

func declareQueue(ch *amqp.Channel) error {
	_, err := ch.QueueDeclare(
		"queue",
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

func consumeQueue(ch *amqp.Channel) error {
	_, err := ch.Consume(
		"queue", // queue name
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

func sendMessage(ch *amqp.Channel, message []byte) error {
	err := ch.Publish(
		"",
		"minha_fila",
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