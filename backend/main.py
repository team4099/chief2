from DataManager import DataManager
import json

camera_port = 0
with open("config/config.json", "r") as config:
    config = json.load(config)
    camera_port = config["DEFAULT_CAMERA_INDEX"]

data_manager = DataManager(camera_port)
data_manager.start_scan()
