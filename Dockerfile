FROM python:3.8

WORKDIR /code
COPY src/requirements.txt /code/
RUN pip install -r requirements.txt

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y
RUN apt-get install -y build-essential libzbar-dev