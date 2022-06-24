from h11 import Data
import DataReader
import DataVal
import requests
import DataWriter
import pandas as pd
import numpy as np
import json
import csv

class DataManager:
    def __init__(self, camera: int):
        self.data_reader = DataReader.DataReader(camera)
        self.check_internet_connection()
        self.data_val = DataVal.DataVal(self.connected_to_internet)

    def check_internet_connection(self):
        if requests.get("https://google.com").status_code == 401:
            self.log.error("It seems that you have no internet connection.")
            self.connected_to_internet = False
        else:
            self.connected_to_internet = True

    def start_scan(self):

        with open("data/data.json", "r") as data:
            qrcodes = json.load(data)

        for submission in qrcodes:
            print(submission)
            self.data_val.validate_submission(submission)
        

DataManager(0).start_scan()