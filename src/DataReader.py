from io import StringIO
import cv2
import numpy as np
import pandas as pd
from pyzbar.pyzbar import decode
from Logger import Logger
import json


class DataReader:
    def __init__(self, cam):
        self.cap = cv2.VideoCapture(cam)
        self.logger = Logger().log

        try:
            with open("config/config.json") as config:
                config = json.load(config)
            self._HEADERS_CSV = "".join(config["HEADERS_CSV"])
            self._HEADERS_JSON = "".join(config["HEADERS_JSON"])
        except Exception as e:
            print(e)
            self._HEADERS_CSV = (
                "Scout ID,Match Key,Team Number,Alliance,Driver Station,Preloaded Cargo,Auto Lower Hub,Auto Upper Hub,"
                "Auto Misses,Taxied,Auto Shooting Zones,Teleop Lower Hub,Teleop Upper Hub,Teleop Misses,Teleop Shooting Zones,"
                "Low Attempted,Mid Attempted,High Attempted,Traversal Attempted,Climb Time,Final Climb Type,"
                "How much do they play defense?,Defense Rating,"
                "How much were they playing through defense?,Counter Defense Rating,Driver Rating"
            )
            self._HEADERS_JSON = (
                "scout_id,match_key,team_number,alliance,driver_station,preloaded_cargo,auto_lower_hub,auto_upper_hub,"
                "auto_misses,taxied,auto_shooting_zones,teleop_lower_hub,teleop_upper_hub,teleop_misses,"
                "teleop_shooting_zones,attempted_low,attempted_mid,attempted_high,attempted_traversal,climb_time,"
                "final_climb_type,defense_pct,defense_rating,counter_defense_pct,counter_defense_rating,driver_rating"
            )

    def _decoder(self, image):
        """
        processes image, extracts qrcodes within frame, and converts data to json
        :param image: The output of the camera on the computer
        :return: A dictionary containing the header and the corresponding value
        """
        gray_img = cv2.cvtColor(image, 0)
        qrcode = decode(gray_img)

        for obj in qrcode:
            points = obj.polygon
            pts = np.array(points, np.int32)
            pts = pts.reshape((-1, 1, 2))
            cv2.polylines(image, [pts], True, (0, 255, 0), 3)

            qrcode_data = obj.data.decode("utf-8")
            print("qrcode_data", qrcode_data)

            formatted_data = [None if i=="" else i for i in qrcode_data.split(",")]
            formatted_data = {header:data for header, data in zip(self._HEADERS_JSON.split(","), formatted_data)}

            return formatted_data

    def read_qrcode(self):
        """
        opens cv2 window and automatically scans qr codes within frame
        :return: a list containing the json formatted data of all the scanned qrcodes
        """
        
        qrcodes = []
        previous_result = None
        while True:
            _, frame = self.cap.read()
            result = self._decoder(frame)
            cv2.imshow('Image', frame)
            
            if result not in qrcodes and result:
                self.logger.info(result)
                qrcodes.append(result)
                self.logger.debug("Scanned Successfully!")
            elif result in qrcodes and result != previous_result:
                self.logger.warn("Already Scanned")
            
            previous_result = result

            code = cv2.waitKey(10)
            if code == ord('q'):
                break

        return qrcodes
