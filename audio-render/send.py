import pika, os

credentials = pika.PlainCredentials(os.environ['RABBITMQ_USER'], os.environ['RABBITMQ_PASSWORD'])
connection = pika.BlockingConnection(pika.ConnectionParameters(port=os.environ['RABBITMQ_PORT'], host=os.environ['RABBITMQ_HOST'], credentials=credentials))  
channel = connection.channel()  

#Create dummy queue and send message - Create send.py
channel.queue_declare(queue='my_queue')  
channel.basic_publish(exchange='',  
                      routing_key='hello',  
                      body='Hello World!')  

connection.close()  