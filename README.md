# ScientiaPodLab

Repository of ScientiaPodLab Thesis

# Run RabbitMQ Server

rabbitmq-server

## To configure rabbitMQ

rabbitmqctl add_user scipodlab password
rabbitmqctl set_user_tags scipodlab administrator
rabbitmqctl set_permissions -p / scipodlab "._" "._" ".\*"

# Run Go

go run main.go
