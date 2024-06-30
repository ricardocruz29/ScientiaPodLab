def declare(channel):
    channel.queue_declare(queue='startRenderEpisode', durable=True)
    channel.queue_declare(queue='finishRenderEpisode', durable=True)