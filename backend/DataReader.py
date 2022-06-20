from io import StringIO
import cv2
import numpy as np
import pandas as pd
from pyzbar.pyzbar import decode
from Logger import Logger


class DataReader:
    _HEADERS_CSV = (
        "Scout ID,Match Key,Team Number,Alliance,Driver Station,Preloaded Cargo,Auto Lower Hub,Auto Upper Hub,"
        "Auto Misses,Taxied,Auto Shooting Zones,Teleop Lower Hub,Teleop Upper Hub,Teleop Misses,Teleop Shooting Zones,"
        "Low Attempted,Mid Attempted,High Attempted,Traversal Attempted,Climb Time,Final Climb Type,"
        "How much do they play defense?,Defense Rating,"
        "How much were they playing through defense?,Counter Defense Rating,Driver Rating"
    )
    _HEADERS_JSON = (
        "scout_id,match_key,team_number,alliance,driver_station,preloaded_cargo,auto_lower_hub,auto_upper_hub,"
        "auto_misses,taxied,auto_shooting_zones,teleop_lower_hub,teleop_upper_hub,teleop_misses,"
        "teleop_shooting_zones,attempted_low,attempted_mid,attempted_high,attempted_traversal,climb_time,"
        "final_climb_type,defense_pct,counter_defense_pct,defense_rating,counter_defense_rating,driver_rating"
    )

    def __init__(self, cam):
        self.cap = cv2.VideoCapture(cam)
        self.logger = Logger()

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

            qrcode_data = self._HEADERS_CSV + "\n" + obj.data.decode("utf-8")

            csv_data = pd.read_csv(StringIO(qrcode_data))
            csv_data = csv_data.replace({np.nan: None})
            
            return {
                key: csv_data[corresponding_header][0]
                for key, corresponding_header in zip(self._HEADERS_JSON.split(","), self._HEADERS_CSV.split(","))
            }

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
                print(result)
                qrcodes.append(result)
                self.logger.info("Scanned Successfully!")
            elif result in qrcodes and result != previous_result:
                self.logger.warn("Already Scanned")
            
            previous_result = result

            code = cv2.waitKey(10)
            if code == ord('q'):
                break

        return qrcodes