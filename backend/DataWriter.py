from Logger import Logger
import json

class DataWriter:
    def __init__(self):
        self._HEADERS_CSV = (
            "Scout ID,Match Key,Team Number,Alliance,Driver Station,Preloaded Cargo,Auto Lower Hub,Auto Upper Hub,"
            "Auto Misses,Taxied,Auto Shooting Zones,Teleop Lower Hub,Teleop Upper Hub,Teleop Misses,Teleop Shooting Zones,"
            "Low Attempted,Mid Attempted,High Attempted,Traversal Attempted,Climb Time,Final Climb Type,"
            "How much do they play defense?,Defense Rating,"
            "How much were they playing through defense?,Counter Defense Rating,Driver Rating"
        )
        self.logger = Logger().log
        self.logger.info("Getting configuration variables from config.json")
        try:
            with open("config/config.json") as config:
                config = json.load(config)
            self.event_key = config["YEAR"] + config["EVENT_KEY"]
            self.year = config["YEAR"]
            self.key = config["EVENT_KEY"]
            self.tba_key = config["TBA_KEY"]
        except FileNotFoundError:
            self.logger.critical("config.json not found. Make sure it's located in the data subdirectory.")
            raise FileNotFoundError
        except NameError:
            self.logger.critical("event year, or event key, or TBA key not found. Please check config.json")
            raise NameError
        self.logger.info("Successfully retrieved configuration variables.")

    def write_data(self, input_json):
        result_json = input_json
        csv_formatted = ",".join([str(value or "") for value in result_json.values()])

        try:
            with open(f"data/{self.event_key}_match_data.csv", "r+") as file:
                if csv_formatted not in file.read():
                    file.write(csv_formatted + "\n")
        except FileNotFoundError:
            with open(f"data/{self.event_key}_match_data.csv", "w") as file:
                file.write(self._HEADERS_CSV + "\n")
                file.write(csv_formatted + "\n")