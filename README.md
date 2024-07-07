# ScientiaPodLab

Repository of ScientiaPodLab Thesis

# Configure Project

## To configure rabbitMQ

Install rabbitmq first
rabbitmqctl add*user scipodlab password
rabbitmqctl set_user_tags scipodlab administrator
rabbitmqctl set_permissions -p / scipodlab ".*" ".\_" ".\*"

## To configure Go

Install Go in your local machine

## To configure Flask

Install python

## Create venv

python3 -m venv venv

## Activate venv

source venv/bin/activate

## Install requirements

pip install -r requirements.txt

## Set FLASK_APP and run Flask

export FLASK_APP=app.py

## To install additional packages and add it to requirements.txt

pip install package_name
pip freeze > requirements.txt

## To use TTS follow this tutorial

https://www.youtube.com/watch?v=GVPWz-nhJhg

# Run the project

## Run RabbitMQ Server

rabbitmq-server

## Run Go

go run main.go

## Run Flask

source venv/bin/activate
python app.py
