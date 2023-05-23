from pydub import AudioSegment
import librosa
import noisereduce as nr
import os
import uuid

#DOCS - https://github.com/timsainb/noisereduce
def noisereduce(id, file_type):
  if file_type == 'WAV':
      sr = 44100  # Sampling rate to WAV files
  else:
      sr = None

  #Load audio file - CDN PATH + id
  audio_data, sampling_rate = librosa.load(os.environ['CDN_PATH'] + "/recorded/" + id , sr=sr)

  # Apply reduce_noise algorithm
  reduced_noise = nr.reduce_noise(audio_clip=audio_data, noise_clip=audio_data, verbose=False)

  # Build full path for reduced noise file 
  output_filename = str(uuid.uuid4())
  output_path = os.path.join(os.environ['CDN_PATH'], "recorded" , output_filename + '.mp3')

  # Convert reduced file audio in AudioSegment Object
  audio_segment = AudioSegment(data=reduced_noise.tobytes(), frame_rate=sampling_rate, sample_width=2, channels=1)

  # Save audio file in FLAC format
  audio_segment.export(output_path, format='flac')