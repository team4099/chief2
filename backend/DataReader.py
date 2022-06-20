import cv2
import numpy as np
from pyzbar.pyzbar import decode


class DataReader:
    def __init__(self, cam):
        self.cap = cv2.VideoCapture(cam)

    def _decoder(self, image):
        gray_img = cv2.cvtColor(image, 0)
        barcode = decode(gray_img)

        for obj in barcode:
            points = obj.polygon
            pts = np.array(points, np.int32)
            pts = pts.reshape((-1, 1, 2))
            cv2.polylines(image, [pts], True, (0, 255, 0), 3)

            barcode_data = obj.data.decode("utf-8")

            return barcode_data

    def read_qrcode(self):
        result = None

        while not result:
            ret, frame = self.cap.read()
            result = self._decoder(frame)
            cv2.imshow('Image', frame)
            code = cv2.waitKey(10)
            if code == ord('q'):
                break

        return result


cam = int(input("Cam #: "))
DataReader(cam).read_qrcode()
# print(DataReader(cam).read_qrcode())