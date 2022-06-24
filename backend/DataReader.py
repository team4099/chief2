from io import StringIO

import cv2
import numpy as np
import pandas as pd
from pyzbar.pyzbar import decode


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
        self.qrcodes = []

    def _decoder(self, image):
        gray_img = cv2.cvtColor(image, 0)
        barcode = decode(gray_img)

        for obj in barcode:
            points = obj.polygon
            pts = np.array(points, np.int32)
            pts = pts.reshape((-1, 1, 2))
            cv2.polylines(image, [pts], True, (0, 255, 0), 3)

            barcode_data = self._HEADERS_CSV + "\n" + obj.data.decode("utf-8")

            csv_data = pd.read_csv(StringIO(barcode_data))
            csv_data = csv_data.replace({np.nan: None})
            return {
                key: csv_data[corresponding_header][0]
                for key, corresponding_header in zip(self._HEADERS_JSON.split(","), self._HEADERS_CSV.split(","))
            }

    def read_qrcode(self):
        qrcodes = []
        while True:
            _,frame = self.cap.read()
            result = self._decoder(frame)
            cv2.imshow('Image', frame)
            if result not in qrcodes and result:
                qrcodes.append(result)
                print("Scanned")
            elif result in qrcodes:
                print("Already scanned")
            
            code = cv2.waitKey(10)
            if code == ord('q'):
                break

        return qrcodes


cam = int(input("Cam #: "))
scanner = DataReader(cam)

print(scanner.read_qrcode())
