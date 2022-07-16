from Logger import Logger
from DataReader import DataReader
from DataVal import DataVal
from DataWriter import DataWriter
import requests
import sys
# import json


class DataManager:
    def __init__(self, camera: int):
        self.data_reader = DataReader(camera)
        self.check_internet_connection()
        self.data_val = DataVal(self.connected_to_internet)
        self.data_writer = DataWriter()
        self.log = Logger().log

    def check_internet_connection(self):
        self.connected_to_internet = False
        try:
            if requests.get("https://google.com").status_code == 401:
                self.log.error("It seems that you have no internet connection.")
                self.connected_to_internet = False
            else:
                self.connected_to_internet = True
        except Exception as e:
            self.connected_to_internet = False

    def start_scan(self):
        # with open("data/data.json", "r") as data:
        #     qrcodes = json.load(data)

        qrcodes = self.data_reader.read_qrcode()
        for submission in qrcodes:
            self.data_val.validate_submission(submission)
            self.log.info("Validation succeeded for submission!")
            self.data_writer.write_data(submission)
