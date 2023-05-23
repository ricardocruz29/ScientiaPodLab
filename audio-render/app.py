from flask import Flask
import pika
from dotenv.main import load_dotenv
import os
from receive import receive
#! CMD to update requirements: pip3 freeze > requirements.txt


#setup
app = Flask(__name__)
load_dotenv()



@app.route("/tts")
def home():
    #Route that will call the function to parse text to speech. Add the file to CDN, and then return a uuid
    return "Hello, Flask!"

@app.route("/stt")
def home():
    #Route that will call the function to parse speech to text. Receives an uuid, gets the file from CDN and then returns text
    return "Hello, Flask!"


#Establish rabbitMQ connection
credentials = pika.PlainCredentials(os.environ['RABBITMQ_USER'], os.environ['RABBITMQ_PASSWORD'])
connection = pika.BlockingConnection(pika.ConnectionParameters(port=os.environ['RABBITMQ_PORT'], host=os.environ['RABBITMQ_HOST'], credentials=credentials))  
channel = connection.channel()  

#receive - Function receive must connect to 2 queues. One for concatenating audios, other for do noise cancellation in audios.
receive(channel)

