from Logger import Logger
import json

class DataWriter:
    def __init__(self):
        self._HEADERS_JSON = (
                "scout_id,match_key,team_number,alliance,driver_station,preloaded_cargo,auto_lower_hub,auto_upper_hub,"
                "auto_misses,taxied,auto_shooting_zones,teleop_lower_hub,teleop_upper_hub,teleop_misses,"
                "teleop_shooting_zones,attempted_low,attempted_mid,attempted_high,attempted_traversal,climb_time,"
                "final_climb_type,defense_pct,defense_rating,counter_defense_pct,counter_defense_rating,driver_rating,"
                "auto_notes,teleop_notes,misc_notes"
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

    def write_data(
            self,
            input_json: dict
    ):
        """
        Writing submissions (individually) to a CSV
        :param input_json: submission in dictionary format. this submission in dictionary format will be written to the event specific csv
        :return:
        """

        result_json = input_json
        csv_formatted = ",".join([str(value or "") for value in result_json.values()])

        try:
            with open(f"data/{self.event_key}_match_data.csv", "r+") as file:
                if csv_formatted not in file.read():
                    file.write(csv_formatted + "\n")
        except FileNotFoundError:
            with open(f"data/{self.event_key}_match_data.csv", "w") as file:
                file.write(self._HEADERS_JSON + "\n")
                file.write(csv_formatted + "\n")