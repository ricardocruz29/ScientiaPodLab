from noisereduce import noisereduce

def receive(channel):
    channel.queue_declare(queue='hello')  
  
    def callback(ch, method, properties, body):  
        #this has to be separated in queues but this one can be for noise reduce
        noisereduce(1, "mp3") #this arguments must come from the queue arguments
        print(" [x] Received %r" % body)  
  
    channel.basic_consume(queue='hello', on_message_callback=callback, auto_ack=True)  
  
    

    print('Waiting for messages. To exit press CTRL+C')  
    channel.start_consuming()  