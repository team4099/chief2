from h11 import Data
import DataReader
import DataVal
import DataWriter

class DataManager:
    def __init__(self, camera: int, wifi: bool):
        self.data_reader = DataReader.DataReader(camera)
        self.data_val = DataVal.DataVal(wifi)

    def start_scan(self):
        qrcodes = self.data_reader.read_qrcode()
        print(qrcodes)

        for submission in qrcodes:
            self.data_val.validate_submission(submission)

DataManager(0, True).start_scan()