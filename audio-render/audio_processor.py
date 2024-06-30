import subprocess
from pydub import AudioSegment
import ffmpeg
import uuid
import os

#https://blog.deepgram.com/best-python-audio-manipulation-tools/ - Change Sample Rate (Manipulating Audio Data Sampling Rates With Python)
#https://blog.deepgram.com/ffmpeg-beginners/ - Trim, Change Volume, Reduce Background Noise
#https://medium.com/@binsdreams/how-to-mix-audio-files-and-apply-effects-in-audio-c1dcdf005ec2 - Mix/Overlay audio files

'''
  Explicação Mix/Overlay ffmpeg cmd
  1.  -i source1 -i effect1 -i effect2: Essas opções especificam as fontes de entrada para o comando. O source1 é o arquivo de origem do vídeo, effect1 é o arquivo de origem do primeiro efeito de áudio e effect2 é o arquivo de origem do segundo efeito de áudio.
  2.  -filter_complex [1]adelay=startOffset|startOffset[s1];[2]adelay=startOffset2|startOffset2 [s2]: Aqui está o filtro complexo que será aplicado às fontes de entrada. Ele usa os efeitos de atraso de áudio (adelay) nos efeitos 1 e 2, com parâmetros startOffset e startOffset2 especificando os atrasos de início para cada um dos efeitos. Os resultados são armazenados nos streams s1 e s2.
  3.  [0][s1][s2]amix=3[mixout]: Esta parte do filtro complexo combina os streams de entrada. [0] refere-se ao stream de vídeo de entrada (source1), [s1] refere-se ao stream de áudio resultante do primeiro efeito e [s2] refere-se ao stream de áudio resultante do segundo efeito. amix=3 especifica que estamos misturando três fluxos de entrada. O resultado da mistura é armazenado no stream [mixout].
  4.  -map [mixout]: Essa opção especifica qual stream será mapeado para a saída final. Neste caso, o stream [mixout] (resultado da mistura dos efeitos) será usado.
  5.  -c:v copy: Essa opção especifica que o vídeo de saída será copiado sem qualquer modificação de codec. Isso significa que o codec de vídeo será mantido igual ao do vídeo de origem.
  6.  destinationPath: Esse é o caminho do arquivo de saída onde o resultado final será salvo. 

  Como concatenar o resultante deste áudio com uma Intro e Outro por exemplo
  ffmpeg -i Intro.mp3 -i AudioAnterior.wav -i Outro.m4a -i source1.mp4 -filter_complex "[3:a][1:a][2:a]concat=n=3:v=0:a=1[audio]" -map 3:v -map "[audio]" -c:v copy -c:a aac -strict experimental output.mp4
  Explicação do comando
  1. -i Intro.mp3 -i AudioAnterior.wav -i Outro.m4a -i source1.mp4: Essas opções especificam as fontes de entrada para o comando. Intro.mp3 é o arquivo de áudio da introdução, AudioAnterior.wav é o arquivo de áudio resultante da etapa anterior (resultado da mistura dos efeitos), Outro.m4a é o arquivo de áudio do final e source1.mp4 é o arquivo de vídeo original.
  2. -filter_complex "[3:a][1:a][2:a]concat=n=3:v=0:a=1[audio]": Aqui está o filtro complexo para realizar a concatenação dos arquivos de áudio. [3:a] refere-se ao áudio do vídeo original (source1.mp4), [1:a] refere-se ao áudio resultante da etapa anterior e [2:a] refere-se ao áudio do arquivo "Outro.m4a". A opção concat é usada para concatenar os três áudios. n=3 especifica o número de entradas para concatenação, v=0 indica que não há fluxo de vídeo de entrada e a=1 indica que o fluxo de áudio resultante será o de saída. O resultado da concatenação é armazenado no stream [audio].
  3. -map 3:v -map "[audio]": Essa opção especifica quais streams serão mapeados para a saída final. 3:v mapeia o fluxo de vídeo do arquivo original (source1.mp4) e "[audio]" mapeia o fluxo de áudio resultante da concatenação.
  4. -c:v copy -c:a aac -strict experimental: Essas opções definem os codecs de vídeo e áudio para a saída final. -c:v copy copia o fluxo de vídeo sem modificação de codec. -c:a aac define o codec de áudio como AAC. -strict experimental é necessário quando se usa o codec AAC.
  5. output.mp4: Esse é o nome do arquivo de saída final.
'''

class Audio:
    def set_sample_rate(self, input):
      mp3_input = self.convert(input)
      sound = AudioSegment.from_mp3(mp3_input)
      sound_w_new_fs = sound.set_frame_rate(44100)
      output_filename = str(uuid.uuid4())
      output_path = os.environ['CDN_LOCAL_PATH'] + "/audios/episodes/" + output_filename + ".mp3"
      sound_w_new_fs.export(output_path, format="mp3")
      return output_path
       
    def trim(self, input, start="0", end=None):
      if end == None:
        end = ffmpeg.probe(input)['format']['duration']

      trim_duration = end - start

      output_filename = str(uuid.uuid4())
      output_path = os.environ['CDN_LOCAL_PATH'] + "/audios/tmp/" + output_filename + ".mp3"

      cmd = f"ffmpeg -i {input} -ss {start} -t {trim_duration} {output_path}"

      ffmpeg_run(cmd)
        
    def convert(self, filename):
      path_list = filename.split("/")
      filename = path_list[len(path_list)-1]
      path_list.remove(filename)
      if(len(path_list)!=0 and path_list[0]==""):
          path_list.remove(path_list[0])
      path = ""

      for folder in path_list:
          path = path+"/"+folder

      extension = filename.split(".")[1]

      if path!="":
          audio = AudioSegment.from_file(path+"/"+filename, format=extension)
      else:
          audio = AudioSegment.from_file(filename, format=extension)

      tmp_path = os.environ['CDN_LOCAL_PATH'] + "/audios/tmp/" + filename.split(".")[0] + ".mp3"
      audio.export(tmp_path, format="mp3")

      return tmp_path
    
    def concatenate(self, audio_paths):
      combined = AudioSegment.empty()
      for path in audio_paths:
          audio = AudioSegment.from_mp3(path)
          combined += audio

      output_filename = str(uuid.uuid4())
      output_path = os.environ['CDN_LOCAL_PATH'] + "/audios/episodes/" + output_filename + ".mp3"
      combined.export(output_path, format="mp3")
      return output_filename + ".mp3"
    
    #DOCS - https://github.com/timsainb/noisereduce
    # def noise_reduce(self, id, file_type):
    #   if file_type == 'WAV':
    #       sr = 44100  # Sampling rate to WAV files
    #   else:
    #       sr = None

    #   #Load audio file - CDN PATH + id
    #   audio_data, sampling_rate = librosa.load(os.environ['CDN_PATH'] + "/recorded/" + id , sr=sr)

    #   # Apply reduce_noise algorithm
    #   reduced_noise = nr.reduce_noise(audio_clip=audio_data, noise_clip=audio_data, verbose=False)

    #   # Build full path for reduced noise file 
    #   output_filename = str(uuid.uuid4())
    #   output_path = os.path.join(os.environ['CDN_PATH'], "recorded" , output_filename + '.mp3')

    #   # Convert reduced file audio in AudioSegment Object
    #   audio_segment = AudioSegment(data=reduced_noise.tobytes(), frame_rate=sampling_rate, sample_width=2, channels=1)

    #   # Save audio file in FLAC format
    #   audio_segment.export(output_path, format='flac')


def ffmpeg_run(cmd):
  subprocess.call(cmd, shell=True)