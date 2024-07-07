import threading
from flask import Flask, request, jsonify
import pika
from dotenv.main import load_dotenv
import os
from consume import consume
from declare import declare
from tts import convert_text_to_speech
from logger_config import logger

#! CMD to update requirements: pip3 freeze > requirements.txt
#! To run App: python app.py
#setup
app = Flask(__name__)
load_dotenv()

@app.route("/tts",  methods=['POST'])
def tts():
    # Retrieve the 'text' and 'voice' arguments from the POST request
    data = request.get_json()
    text = data.get('text')
    voice = data.get('voice')
    
    # Check if both arguments are provided
    if not text or not voice:
        return jsonify({"error": "Both 'text' and 'voice' are required"}), 400

    tts_audio_id = convert_text_to_speech(text, voice)

    #Route that will call the function to parse text to speech. Add the file to CDN, and then return a uuid
    return jsonify({"tts_audio_id": tts_audio_id}), 200


def start_flask_app():
    logger.info("start flask app")
    app.run(host='0.0.0.0', port=8080)

def start_rabbitmq_consumer():
    logger.info("start rabbitmq consumer")
    #Establish rabbitMQ connection
    credentials = pika.PlainCredentials(os.environ['RABBITMQ_USER'], os.environ['RABBITMQ_PASSWORD'])
    connection = pika.BlockingConnection(pika.ConnectionParameters(port=os.environ['RABBITMQ_PORT'], host=os.environ['RABBITMQ_HOST'], credentials=credentials))  
    channel = connection.channel()  
    logger.info("connected to rabbitmq consumer")

    #declare - Function to declare the queues
    declare(channel)
    logger.info("declared queues")

    #consume - Function consume connects to the queue that will receive the audios to concatenate
    consume(channel)

if __name__ == "__main__":
    # Create threads for Flask app and RabbitMQ consumer
    flask_thread = threading.Thread(target=start_flask_app)
    rabbitmq_thread = threading.Thread(target=start_rabbitmq_consumer)

    # Start both threads
    flask_thread.start()
    rabbitmq_thread.start()

    # Wait for both threads to finish
    flask_thread.join()
    rabbitmq_thread.join()
