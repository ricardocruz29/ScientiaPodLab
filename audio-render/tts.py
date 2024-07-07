import uuid
from google.cloud import texttospeech
import os
from logger_config import logger

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './private/scientiapodlab-tts.json'

def convert_text_to_speech(text, voice):
  client = texttospeech.TextToSpeechClient()
  synthesis_input = texttospeech.SynthesisInput(text=text)

  voice = texttospeech.VoiceSelectionParams(
    language_code="pt-PT",
    name=voice
  )

  audio_config = texttospeech.AudioConfig(
    audio_encoding=texttospeech.AudioEncoding.MP3,
    effects_profile_id=['small-bluetooth-speaker-class-device'],
    speaking_rate=1,
    pitch=1
  )

  response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)

  output_filename = str(uuid.uuid4())
  output_path = os.environ['CDN_LOCAL_PATH'] + "/audios/resources/" + output_filename + ".mp3"

  with open(output_path, "wb") as output:
    output.write(response.audio_content)
    logger.info("TTS audio content written to file " + output_path)

  return output_filename + ".mp3"






