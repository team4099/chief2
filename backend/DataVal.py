from Logger import Logger
import pandas as pd
import json
import re
import os

class DataVal:
    def __init__(
            self,
            wifi_connection: bool = False,
    ):

        self.logger = Logger()
        self.logger.info("Logging started")

        self.wifi_connection = wifi_connection
        self.logger.info("Starting Validation Process")
        if wifi_connection:
            self.logger.info("Wifi Connection Exists. Will cross check against TBA")
            #os.system('python scripts/getMatchSchedule.py')
        else:
            self.logger.warn("Wifi Connection was not found. Will not check against TBA")
            #os.system('python scripts/convertCSVToMatchSchedule.py')
        self.match_schedule = None

        with open("config/config.json") as config:
            config = json.load(config)
        self.event_key = config["YEAR"] + config["EVENT_KEY"]

    def validate_submission(
            self,
            submission: dict,
    ):
        """
        <write purpose here>
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        self.check_submission_with_match_schedule(submission)
        self.check_for_higher_than_six_ball_auto(submission)
        
        

    def validate_data(
            self,
            filepath: str,
            match_schedule_JSON: str
    ):
        """
        <write purpose here>
        :param filepath: Filepath to csv that contains all the data. Ex: "data/dcmp_data.csv"
        :return: None
        """
        self.logger.info("Reading data from CSV")
        scoutingdf = pd.read_csv(filepath)
        self.logger.info("Success! CSV data has been read.")
        scoutingdict = scoutingdf.to_dict(orient='records')

        self.logger.info("Reading match schedule JSON")
        with open(match_schedule_JSON) as f:
            match_schedule = json.load(f)
        self.logger.info("Success! JSON match schdeule has been read.")
        self.match_schedule = match_schedule


        for submission in scoutingdict:
            if pd.isna(submission["team_number"]):
                self.logger.critical(f"NO TEAM NUMBER for match {submission['match_key']}")
                continue
            else:
                self.validate_submission(submission)

    # Submission specific validation

    def check_submission_with_match_schedule(
            self, 
            submission: dict
    ):

        """
        <write purpose here>
        :param submission:
        :return:
        """
        match_key = str(submission["match_key"]).strip().lower()
        event_and_match_key = f"{self.event_key}_{match_key}"

        #check match key format regex
        match_key_format = re.compile(r"(qm[1-9][0-9]{0,3})|(qf[1-4]m[1-3])|(sf[1-2]m[1-3])|(f[1]m[1-3])")
        if not re.fullmatch(match_key_format, match_key):
            self.logger.error(f"In {submission['match_key']}, frc{int(submission['team_number'])} INVALID MATCH KEY ")
        
        #check if match key exists in schedule
        if event_and_match_key not in self.match_schedule:
            self.logger.error(f"In {submission['match_key']}, frc{int(submission['team_number'])} MATCH KEY NOT FOUND in schedule ")

        else:
            #check if robot was in match
            team_number = int(submission["team_number"])
            alliance = submission["alliance"]
            if f"frc{team_number}" not in self.match_schedule[f"{self.event_key}_{match_key}"][alliance.lower()]:
                self.logger.error(f"frc{int(team_number)} was NOT IN MATCH {submission['match_key']}, on the {alliance} alliance")

            else:
                #check for correct driver station
                scouted_driver_station = submission["driver_station"]
                schedule_driver_station = self.match_schedule[event_and_match_key][alliance.lower()].index(f"frc{team_number}") +1
                if scouted_driver_station != schedule_driver_station:
                    self.logger.error(f"In {submission['match_key']}, frc{team_number} INCONSISTENT DRIVER STATION with schedule")

    def check_for_higher_than_six_ball_auto(
            self,
            submission: dict
    ):
        """
        <write purpose here>
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        balls_shot_in_auto = float(submission["auto_lower_hub"]) + float(submission["auto_upper_hub"]) + float(submission["auto_misses"])
        if balls_shot_in_auto > 6:
            self.logger.warn(f"In {submission['match_key']}, frc{int(submission['team_number'])} shot {int(balls_shot_in_auto)} balls in Autonomous.")


    # Data specific validation
    def check_for_double_scouting(
            self, scoutingdict: dict
    ):
        """
        <write purpose here>
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """

        
        


        
    

DataVal().validate_data(filepath="data/dcmp_data.csv", match_schedule_JSON="data/match_schedule.json")


