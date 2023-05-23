from flask import Flask
import pika
from dotenv.main import load_dotenv
import os
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

#Create dummy queue and send message - Create send.py
channel.queue_declare(queue='my_queue')  
channel.basic_publish(exchange='',  
                      routing_key='hello',  
                      body='Hello World!')  

#Consume from dummy queue - Create receive.py
def callback(ch, method, properties, body):  
  print(" [x] Received %r" % body)  

channel.basic_consume(queue='hello',  
                      auto_ack=True,  
                      on_message_callback=callback)  

connection.close()  