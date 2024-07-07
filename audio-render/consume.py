import os
from flask import json
import pika
from audio_processor import Audio
from logger_config import logger

def consume(channel):
    def callback(ch, method, properties, body):
        try:
            logger.info(" [x] Received %r" % body)  

            message = json.loads(body)
            audio_ids = message["resources"]
            episode_id = message["episodeId"]
            noise_cancellation = message["noiseCancellation"]

            if not audio_ids:
                logger.info("No audio IDs provided")
                return

            audio_paths = [os.environ['CDN_LOCAL_PATH'] + "/audios/resources/" + audio_id for audio_id in audio_ids]
            logger.info(audio_paths)

            audio_processor = Audio()

            # Convert all audios to MP3
            mp3_paths = [audio_processor.convert(path) for path in audio_paths]

            # Concatenate all MP3 audios
            audio_id = audio_processor.concatenate(mp3_paths)

            if noise_cancellation:
                # ! This method is commented because we need to figure out a new way of doing this
                # audio_processor.noisereduce(1, "mp3") #this arguments must come from the queue arguments       
                logger.info("hasNoiseCancellation")

            data = {
                "audio_path": audio_id,
                "episode_id": episode_id
            }
            # Convert the data to a JSON string
            data_json = json.dumps(data)

            channel.basic_publish(
                exchange='',
                routing_key="finishRenderEpisode",
                body=data_json,
                properties=pika.BasicProperties(
                    delivery_mode=2,  # make message persistent
                )
            )
            
            logger.info(f"Processed audio file path: {audio_id}")

        except Exception as e:
            logger.info(f"Error processing message: {str(e)}")

        
    channel.basic_consume(queue='startRenderEpisode', on_message_callback=callback, auto_ack=True)  
  
    logger.info('Waiting for messages. To exit press CTRL+C')  
    channel.start_consuming()  