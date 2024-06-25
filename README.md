# ScientiaPodLab

Repository of ScientiaPodLab Thesis

# Run RabbitMQ Server

rabbitmq-server

## To configure rabbitMQ

rabbitmqctl add*user scipodlab password
rabbitmqctl set_user_tags scipodlab administrator
rabbitmqctl set_permissions -p / scipodlab ".*" ".\_" ".\*"

# Run Go

go run main.go

# Run Flask

## Create venv

python3 -m venv venv

## Activate venv

source venv/bin/activate

## Install requirements

pip install -r requirements.txt

## Set FLASK_APP and run Flask

export FLASK_APP=app.py
flask run

## To install additional packages and add it to requirements

pip install package_name
pip freeze > requirements.txt
