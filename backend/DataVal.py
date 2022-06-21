from Logger import Logger
import pandas as pd
import json
import re


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
        else:
            self.logger.warn("Wifi Connection was not found. Will not check against TBA")
        self.match_schedule = None

        with open("config/config.json") as config:
            config = json.load(config)
        self.event_key = config["YEAR"] + config["EVENT_KEY"]

    def validate_submission(
            self,
            submission: dict,
    ):
        """
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        self.check_submission_with_match_schedule(submission)
        self.check_for_higher_than_six_ball_auto(submission)
        self.check_for_missing_shooting_zones(submission)


    def validate_data(
            self,
            filepath: str,
            match_schedule_JSON: str
    ):
        """
        :param filepath: Filepath to csv that contains all the data. Ex: "data/dcmp_data.csv"
        :return: None
        """
        self.logger.info("Reading data from CSV")
        scoutingdf = pd.read_csv(filepath)
        self.logger.info("Success! CSV data has been read.")
        scouting_data = scoutingdf.to_dict(orient='records')


        self.logger.info("Reading match schedule JSON")
        with open(match_schedule_JSON) as f:
            match_schedule = json.load(f)
        self.logger.info("Success!JSON match schdeule has been read.")
        self.match_schedule = match_schedule

        #individual submission checks called from validate_submission method
        for submission in scouting_data:
            if pd.isna(submission["team_number"]):
                self.logger.critical(f"NO TEAM NUMBER for match {submission['match_key']}")
                next
            else:
                self.validate_submission(submission)
        
        #checks on whole data
        self.check_team_numbers_for_each_match(scouting_data)

    # Submission specific validation

    def check_submission_with_match_schedule(
            self, 
            submission: dict
    ):
        """
        :param filepath: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27"
        :return: None
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


    def check_for_missing_shooting_zones(
            self,
            submission: dict
    ):
        """

        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        #checks auto shooting zones
        balls_shot_in_auto = float(submission["auto_lower_hub"]) + float(submission["auto_upper_hub"]) + float(submission["auto_misses"])
        if pd.notna(balls_shot_in_auto) and balls_shot_in_auto > 0 and pd.isna(submission["auto_shooting_zones"]):
            self.logger.error(f"In {submission['match_key']}, frc{int(submission['team_number'])} MISSING AUTO SHOOTING ZONES")

        #checks teleop shooting zones
        balls_shot_in_teleop = float(submission["teleop_lower_hub"]) + float(submission["teleop_upper_hub"]) + float(submission["teleop_misses"])
        if pd.notna(balls_shot_in_teleop) and balls_shot_in_teleop > 0 and pd.isna(submission["teleop_shooting_zones"]):
            self.logger.error(f"In {submission['match_key']}, frc{int(submission['team_number'])} MISSING TELEOP SHOOTING ZONES")


    def check_for_higher_than_six_ball_auto(
            self,
            submission: dict
    ):
        """

        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        balls_shot_in_auto = float(submission["auto_lower_hub"]) + float(submission["auto_upper_hub"]) + float(submission["auto_misses"])
        if balls_shot_in_auto > 6:
            self.logger.warn(f"In {submission['match_key']}, frc{int(submission['team_number'])} shot {int(balls_shot_in_auto)} balls in Autonomous.")


    # Data specific validation
    def check_team_numbers_for_each_match(
            self, scouting_data: list
    ):
        """

        :param scoutingData: list of all submissions from csv, each submission is a dictionary, Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27"
        :return: None
        """

        #sort data into groups by match 
        match_key_groups = {}

        for submission in scouting_data:
            if pd.notna(submission["match_key"]):
                match_key = submission["match_key"].strip().lower()
                if match_key in match_key_groups:
                    match_key_groups[match_key].append(submission)
                else:
                    match_key_groups[match_key] = [submission]


        for match_key in match_key_groups:

            #check for double scouting
            teams_scouted = {}
            for submission in match_key_groups[match_key]:
                if pd.notna(submission["team_number"]):
                    team_number = int(submission["team_number"])
                    if team_number in teams_scouted:
                        teams_scouted[f"frc{team_number}"] += 1
                        self.logger.error(f"In {match_key}, frc{team_number} was SCOUTED TWICE")
                    else:
                        teams_scouted[f"frc{team_number}"] = 1
            

            #check for missing robot
            if f"{self.event_key}_{match_key}" in self.match_schedule:
                teams = self.match_schedule[f"{self.event_key}_{match_key}"]["red"] + self.match_schedule[f"{self.event_key}_{match_key}"]["blue"]
                for team in teams:
                    if team not in teams_scouted:
                        self.logger.error(f"In {match_key}, {team} was NOT SCOUTED")
                    

        
        

        
        


        
    

DataVal().validate_data(filepath="data/dcmp_data.csv", match_schedule_JSON="data/match_schedule.json")


