from flask import Flask
import pika
from dotenv.main import load_dotenv
import os
from receive import receive
#! CMD to update requirements: pip3 freeze > requirements.txt


#setup
app = Flask(__name__)
load_dotenv()



@app.route("/")
def home():
    return "Hello, Flask!"

#Establish rabbitMQ connection
credentials = pika.PlainCredentials(os.environ['RABBITMQ_USER'], os.environ['RABBITMQ_PASSWORD'])
connection = pika.BlockingConnection(pika.ConnectionParameters(port=os.environ['RABBITMQ_PORT'], host=os.environ['RABBITMQ_HOST'], credentials=credentials))  
channel = connection.channel()  

#receive
receive(channel)

