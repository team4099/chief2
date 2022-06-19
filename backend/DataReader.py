import cv2
from pyzbar.pyzbar import decode


class DataReader:
    def __init__(self):
        self.cap = cv2.VideoCapture(0)

    def _decoder(self, image):
        gray_img = cv2.cvtColor(image, 0)
        barcode = decode(gray_img)

        for obj in barcode:
            barcode_data = obj.data.decode("utf-8")
            return barcode_data

    def read_qrcode(self):
        result = None

        while not result:
            ret, frame = self.cap.read()
            result = self._decoder(frame)
            cv2.imshow('Image', frame)
            cv2.waitKey(10)

        return result
