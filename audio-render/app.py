from flask import Flask
import pika
from dotenv.main import load_dotenv
import os
from consume import consume
from declare import declare

#! CMD to update requirements: pip3 freeze > requirements.txt
#setup
app = Flask(__name__)
load_dotenv()

# TODO: Check if it is worth to do this via HTTP or RabbitMQ
@app.route("/tts")
def tts():
    #Route that will call the function to parse text to speech. Add the file to CDN, and then return a uuid
    return "Hello, Flask!"


# TODO: This will probably not be implemented
@app.route("/stt")
def stt():
    #Route that will call the function to parse speech to text. Receives an uuid, gets the file from CDN and then returns text
    return "Hello, Flask!"


#Establish rabbitMQ connection
credentials = pika.PlainCredentials(os.environ['RABBITMQ_USER'], os.environ['RABBITMQ_PASSWORD'])
connection = pika.BlockingConnection(pika.ConnectionParameters(port=os.environ['RABBITMQ_PORT'], host=os.environ['RABBITMQ_HOST'], credentials=credentials))  
channel = connection.channel()  


#declare - Function to declare the queues
declare(channel)

#consume - Function consume connects to the queue that will receive the audios to concatenate
consume(channel)

