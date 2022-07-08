from Logger import Logger
import pandas as pd
import json
import re
import requests
import numpy as np
import os
import csv

class DataVal:
    def __init__(
            self,
            wifi_connection: bool
    ):

        self.logger = Logger().log
        self.logger.info("Logging started")

        self.wifi_connection = wifi_connection
        self.logger.info("Starting Validation Process")

        if os.path.exists("data/match_schedule.json"):
            if self.wifi_connection:
                self.logger.info("Wifi Connection Exists. Will cross check against TBA")
                DataVal.get_match_schedule(self.logger)
            else:
                self.logger.warn("Wifi Connection was not found. Will not check against TBA")
                DataVal.convert_CSV_To_Match_Schedule(self.logger)
        
        #load Match Schedule

        self.match_schedule = None
        if os.path.exists("data/match_schedule.json"):
            self.logger.info("Reading match schedule JSON")
            with open("data/match_schedule.json") as f:
                match_schedule = json.load(f)
            self.logger.info("Success! JSON match schdeule has been read.")
            self.match_schedule = match_schedule
        else:
            self.logger.info("No match schdule provided")

        self.scouting_data = None
        self.data_by_match_key = {}
        self.data_by_teams = {}

        

        with open("config/config.json") as config:
            config = json.load(config)
        self.event_key = config["YEAR"] + config["EVENT_KEY"]
        self.tba_key = config["TBA_KEY"]

        last_modified_since = "Wed, 1 Jan 1000 00:00:01 GMT"
        self.request_data = {
            "X-TBA-Auth-Key" : self.tba_key,
            "If-Modified-Since": last_modified_since
        }
        
        if self.wifi_connection:
            self.logger.info("Requesting TBA data")
            post_request_url = f"https://www.thebluealliance.com/api/v3/event/{self.event_key}/matches"
            match_info = requests.get(
                post_request_url, params = self.request_data
            )
            self.logger.info("TBA data successfully retrieved")

            event_matches  = match_info.json()
            match_dictionary = {}
            for match in event_matches:
                match_dictionary[match["key"]] = match
            self.tba_match_data = match_dictionary


    @classmethod
    def valid_match_key(
        cls,
        key
    ):
        """
        checks match key for correct format
        :param key: match key as a a string
        :return: Bolean false if match key error, otherwise true
        """

        #check match key format regex
        match_key_format = re.compile(r"(qm[1-9][0-9]{0,3})|(qf[1-4]m[1-3])|(sf[1-2]m[1-3])|(f[1]m[1-3])")
        if not re.fullmatch(match_key_format, key):
            return False
        return True


    def validate_submission(
            self,
            submission: dict,
    ):
        """
        runs all individual checks on a given match submission
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        match_key = submission["match_key"].strip().lower()
        valid_match_key = DataVal.valid_match_key(match_key)

        if self.match_schedule:
            self.check_submission_with_match_schedule(submission)
            
        self.check_for_higher_than_six_ball_auto(submission)
        self.check_for_missing_shooting_zones(submission)
        self.check_for_invalid_climb_data(submission)
        self.check_for_invalid_defense_data(submission)
        self.check_for_auto_shots_but_no_tax(submission)

        if self.wifi_connection and valid_match_key:
            self.check_submission_with_tba(submission)
            


    def validate_data(
            self,
            filepath: str,
    ):
        """
        Loads scouting data and sorts it into the match key dictionary and 
        Loads match schedule
        Then runs all individual checks on every match submission and executes multi-submission checks i.e. ensuring all teams were scouted in a given match
        :param filepath: Filepath to csv that contains all the data. Ex: "data/dcmp_data.csv"
        :return: None
        """
        self.logger.info("Reading data from CSV")
        scoutingdf = pd.read_csv(filepath)
        self.logger.info("Success! CSV data has been read.")
        scouting_data = scoutingdf.to_dict(orient='records')

        #sort data into groups by match_key, updating self.data_by_match_key
        # format {"match_key": {"red": ["list of submissions for given key on red alliance"], "blue": ["list of submissions for given key on blue alliance"]}}
        for submission in scouting_data:
            alliance = submission["alliance"].lower()
            if pd.notna(submission["match_key"]):
                match_key = submission["match_key"].strip().lower()
                if match_key in self.data_by_match_key:
                    if alliance in self.data_by_match_key[match_key]:
                        self.data_by_match_key[match_key][alliance].append(submission)
                    else:
                        self.data_by_match_key[match_key][alliance] = [submission]
                else:
                    self.data_by_match_key[match_key] = {}
                    self.data_by_match_key[match_key][alliance] = [submission]

        #sort data by team
        # format {"team":[list of all submissions for given team]}
        for submission in scouting_data:
            team = submission["team_number"]
            if team in self.data_by_teams:
                self.data_by_teams[team].append(submission)
            else:
                self.data_by_teams[team] = [submission]

        #individual submission checks called from validate_submission method
        for submission in scouting_data:
            if pd.isna(submission["team_number"]):
                self.logger.critical(f"NO TEAM NUMBER for match {submission['match_key']}")
                continue
            else:
                self.validate_submission(submission)
        

        #checks on whole data

        self.check_team_numbers_for_each_match(scouting_data)

        self.check_for_outliers(scouting_data)

        if self.wifi_connection:
            self.check_shooting_total_with_tba(scouting_data)

    

    # Submission specific validation  
    def check_submission_with_match_schedule(
            self, 
            submission: dict
    ):
        """
        includes all checks relating match key and team number for single submission, checks key format and ensures it exist in schedule, checks team number against schedule and checks for correct driverstation
        :param filepath: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27"
        :return: None
        """
        
        match_key = str(submission["match_key"]).strip().lower()
        event_and_match_key = f"{self.event_key}_{match_key}"

        #check match key format regex
        if not DataVal.valid_match_key(match_key ):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} INVALID MATCH KEY ")

        #check if match key exists in schedule
        if event_and_match_key not in self.match_schedule:
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MATCH KEY NOT FOUND in schedule ")

        else:
            #check if robot was in match
            team_number = int(submission["team_number"][3:]) if submission["team_number"].startsWith("frc") else int(submission["team_number"])
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
        checks if robot shot balls in auto or teleop but scouter didn't select any shooting zones
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        #checks auto shooting zones
        balls_shot_in_auto = float(submission["auto_lower_hub"]) + float(submission["auto_upper_hub"]) + float(submission["auto_misses"])
        if pd.notna(balls_shot_in_auto) and balls_shot_in_auto > 0 and pd.isna(submission["auto_shooting_zones"]):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MISSING AUTO SHOOTING ZONES")

        #checks teleop shooting zones
        balls_shot_in_teleop = float(submission["teleop_lower_hub"]) + float(submission["teleop_upper_hub"]) + float(submission["teleop_misses"])
        if pd.notna(balls_shot_in_teleop) and balls_shot_in_teleop > 0 and pd.isna(submission["teleop_shooting_zones"]):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MISSING TELEOP SHOOTING ZONES")

    def check_for_invalid_climb_data(
            self, 
            submission
    ):
        """
        checks if the final and attempted climb are inconsistent, i.e. final climb tranversal but robot didn't attempt traversal
        also checks robot climbed but no climb time was given
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        final_climb_type = submission["final_climb_type"]
        if final_climb_type != "No Climb" and final_climb_type:
            #check if attempted climb for corresponding final climb type is false
            attempted_climb = submission[f"attempted_{final_climb_type.lower()}"]
            if (pd.isna(attempted_climb)) or attempted_climb == 0:
                self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MISSING ATTEMPTED {final_climb_type.upper()}")

            #check if climb time is missing
            climb_time = submission["climb_time"]
            if (pd.isna(climb_time)) or climb_time == 0:
                self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MISSING CLIMB TIME")
  

    def check_for_invalid_defense_data(
            self,
            submission: dict
    ):
        """
        checks if scouter gave defense or counter defense rating but stated that the robot didn't play defense/counter defense
        checks if scouter stated that robot played defense or counter defense but didn't give a corresponding rating
        checks if total defense played + counter defense played > 100% hence impossible
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        defense_pct = float(submission["defense_pct"])
        defense_rating = submission["defense_rating"]
        counter_pct = float(submission["counter_defense_pct"])
        counter_rating = submission["counter_defense_rating"]

        #check for 0% defense pct but given rating
        if (pd.isna(defense_pct) or defense_pct == 0) and (pd.notna(defense_rating) and defense_rating != 0):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} rated for defense but NO DEFENSE PCT")

        #check for missing defense rating
        if (pd.isna(defense_rating) or defense_rating == 0) and (pd.notna(defense_pct) and defense_pct != 0):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MISSING DEFENSE RATING")

        #check for 0% counter pct but given rating
        if (pd.isna(counter_pct) or counter_pct == 0) and (pd.notna(counter_rating) and counter_rating != 0):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} rated for counter defense but NO COUNTER DEFENSE PCT")

        #check for missing counter defense rating
        if (pd.isna(counter_rating) or counter_rating == 0) and (pd.notna(counter_pct) and counter_pct != 0):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} MISSING COUNTER DEFENSE RATING")

        #inconsistent defense + counter defense pct
        if (defense_pct + counter_pct) > 1:
             self.logger.error(f"In {submission['match_key']}, {submission['team_number']} DEFENSE AND COUNTER DEFENSE PCT TOO HIGH")



    def check_for_higher_than_six_ball_auto(
            self,
            submission: dict
    ):
        """
        checks if total balls shot in auto was greater than 6, outputs warning
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        balls_shot_in_auto = float(submission["auto_lower_hub"]) + float(submission["auto_upper_hub"]) + float(submission["auto_misses"])
        if balls_shot_in_auto > 6:
            self.logger.warn(f"In {submission['match_key']}, {submission['team_number']} shot {int(balls_shot_in_auto)} balls in Autonomous.")


    def check_for_auto_shots_but_no_tax(
            self,
            submission: dict
    ):
        """
        checks if robot shot at least 2 balls in auto but didn't taxi
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        balls_shot_in_auto = float(submission["auto_lower_hub"]) + float(submission["auto_upper_hub"]) + float(submission["auto_misses"])
        taxi = submission["taxied"]
        if balls_shot_in_auto > 1 and (pd.isna(taxi) or not taxi):
            self.logger.warn(f"In {submission['match_key']}, {submission['team_number']} shot {int(balls_shot_in_auto)} balls in Autonomous but DIDN'T TAXI.")


    def check_submission_with_tba(
        self,
        submission:dict
    ):

        """
        validates taxi state and final climb with tba data
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        
        submission_key = submission["match_key"].strip().lower()
        match_key = f"{self.event_key}_{submission_key}"
        score_info = self.tba_match_data[match_key]["score_breakdown"]


        alliance = submission["alliance"].lower()
        driver_station = int(submission["driver_station"])

        tba_taxi = score_info[alliance][f"taxiRobot{driver_station}"]
        tba_climb = score_info[alliance][f"endgameRobot{driver_station}"]

        submission_taxi = submission["taxied"]
        submission_climb = submission["final_climb_type"]
        if submission_climb == "No Climb":
            submission_climb = "None"

        #check for inconsistent taxi
        if (tba_taxi == "No" and (pd.notna(submission_taxi) and submission_taxi)) or (tba_taxi == "Yes" and (pd.isna(submission_taxi) or not submission_taxi)):
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} INCORRECT TAXI according to TBA")

        #check for inconsistent climb type
        if tba_climb != submission_climb:
            self.logger.error(f"In {submission['match_key']}, {submission['team_number']} INCORRECT ClIMB TYPE according to TBA")
        
        



    # Data specific validation
    def check_team_numbers_for_each_match(
            self, 
            scouting_data: list
    ):
        """
        flags missing any unscouted teams for any match and teams that where double scouted
        :param scoutingData: list of all submissions from csv, each submission is a dictionary, Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27"
        :return: None
        """

        for match_key in self.data_by_match_key:
            #check for double scouting
            teams_scouted = {}
            for alliance in self.data_by_match_key[match_key]:
                for submission in self.data_by_match_key[match_key][alliance]:
                    if pd.notna(submission["team_number"]):
                        team_number = int(submission["team_number"][3:]) if submission["team_number"].startsWith("frc") else int(submission["team_number"])
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
    
    def check_shooting_total_with_tba(
            self,
            scouting_data: list
    ):
        """
        compares shooting total in tba data with total from scouted data
        :param scoutingData: list of all submissions from csv, each submission is a dictionary, Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27"
        :return: None
        """
        for match_key in self.data_by_match_key:
            if DataVal.valid_match_key(match_key):
                for alliance in self.data_by_match_key[match_key]:
                    submissions = self.data_by_match_key[match_key][alliance]
                    score_info = self.tba_match_data[f"{self.event_key}_{match_key}"]["score_breakdown"][alliance]

                    #check total auto lower hub
                    auto_lower_scouting_total = 0
                    for submission in submissions:
                        auto_lower_scouting_total += submission["auto_lower_hub"]
                    if pd.isna(auto_lower_scouting_total):
                        auto_lower_scouting_total = 0
                    auto_lower_scouting_total = int(auto_lower_scouting_total)

                    auto_lower_tba_total = score_info["autoCargoLowerNear"] + score_info["autoCargoLowerFar"] + score_info["autoCargoLowerRed"] + score_info["autoCargoLowerBlue"]

                    if auto_lower_scouting_total != auto_lower_tba_total:
                        self.logger.error(f"In {match_key}, {alliance} alliance, INCORRECT AUTO LOWER TOTAL according to TBA, Scouts:{auto_lower_scouting_total}, TBA:{auto_lower_tba_total}")


                    #check total auto upper hub
                    auto_upper_scouting_total = 0
                    for submission in submissions:
                        auto_upper_scouting_total += submission["auto_upper_hub"]
                    if pd.isna(auto_upper_scouting_total):
                        auto_upper_scouting_total = 0
                    auto_upper_scouting_total = int(auto_upper_scouting_total)
                    
                    auto_upper_tba_total = score_info["autoCargoUpperNear"] + score_info["autoCargoUpperFar"] + score_info["autoCargoUpperRed"] + score_info["autoCargoUpperBlue"]

                    if auto_upper_scouting_total != auto_upper_tba_total:
                        self.logger.error(f"In {match_key}, {alliance} alliance, INCORRECT AUTO UPPER TOTAL according to TBA, Scouts:{auto_upper_scouting_total}, TBA:{auto_upper_tba_total}")

                    #check total teleop lower hub
                    teleop_lower_scouting_total = 0
                    for submission in submissions:
                        teleop_lower_scouting_total += submission["teleop_lower_hub"]
                    if pd.isna(teleop_lower_scouting_total):
                        teleop_lower_scouting_total = 0
                    teleop_lower_scouting_total = int(teleop_lower_scouting_total)

                    teleop_lower_tba_total = score_info["teleopCargoLowerNear"] + score_info["teleopCargoLowerFar"] + score_info["teleopCargoLowerRed"] + score_info["teleopCargoLowerBlue"]

                    if teleop_lower_scouting_total != teleop_lower_tba_total:
                        self.logger.error(f"In {match_key}, {alliance} alliance, INCORRECT TELEOP LOWER TOTAL according to TBA, Scouts:{teleop_lower_scouting_total}, TBA:{teleop_lower_tba_total}")


                    #check total telleop lower hub
                    teleop_upper_scouting_total = 0
                    for submission in submissions:
                        teleop_upper_scouting_total += submission["teleop_upper_hub"]
                    if pd.isna(teleop_upper_scouting_total):
                        teleop_upper_scouting_total = 0
                    teleop_upper_scouting_total = int(teleop_upper_scouting_total)
                    
                    teleop_upper_tba_total = score_info["teleopCargoUpperNear"] + score_info["teleopCargoUpperFar"] + score_info["teleopCargoUpperRed"] + score_info["teleopCargoUpperBlue"]

                    if teleop_upper_scouting_total != teleop_upper_tba_total:
                        self.logger.error(f"In {match_key}, {alliance} alliance, INCORRECT TELEOP UPPER TOTAL according to TBA, Scouts:{teleop_upper_scouting_total}, TBA:{teleop_upper_tba_total}")


    def check_for_outliers(
            self,
            scouting_data: list
    ):
        Z_THRESSHOLD = 1.96

        for team in self.data_by_teams:

            data_fields= {"auto_lower_hub": [], 
                          "auto_upper_hub": [], 
                          "teleop_lower_hub": [], 
                          "teleop_upper_hub": []}

            for submission in self.data_by_teams[team]:
                for field in data_fields:
                    data_fields[field].append(submission[field])

            for field in data_fields:
                data =  data_fields[field]

                mean = np.mean(data)
                std = np.std(data)
                q1 = np.percentile(data, 25, interpolation = 'midpoint')
                q3 = np.percentile(data, 75, interpolation = 'midpoint')
                #find outliers
                for submission in self.data_by_teams[team]:
                    value = submission[field]
                    if DataVal.z_score_outlier(value, mean, std, Z_THRESSHOLD):
                        self.logger.warn(f"In {submission['match_key']}, frc{team} {field} performance was Z-SCORE OUTLIER")
                    if DataVal.IQR_outlier(value, q1, q3):
                        self.logger.warn(f"In {submission['match_key']}, frc{team} {field} performance was IQR OUTLIER")



    @classmethod
    def z_score_outlier(cls, value, mean, std, threshold):
        return abs(value - mean)/std > threshold

    @classmethod
    def IQR_outlier(cls, value, q1, q3):
        IQR = q3-q1
        lower_bound = q1 - 1.5*IQR
        upper_bound = q3 + 1.5*IQR
        return value < lower_bound or value > upper_bound

    @staticmethod
    def get_match_schedule(
            logger: Logger
    ):
        #retrieves event key from config file
        logger.info("Getting configuration variables from config.json")
        try:
            with open("config/config.json") as config:
                config = json.load(config)
            event_key = config["YEAR"] + config["EVENT_KEY"]

            tba_key = config["TBA_KEY"]
        except FileNotFoundError:
            logger.critical("config.json not found. Make sure it's located in the data subdirectory.")
            raise FileNotFoundError
        except NameError:
            logger.critical("event year, or event key, or TBA key not found. Please check config.json")
            raise NameError
        logger.info("Successfully retreived configuration variablees.")

        #setting up tba post request
        last_modified_since = "Wed, 1 Jan 1000 00:00:01 GMT"

        post_request_url = "https://www.thebluealliance.com/api/v3/event/{}/matches/simple".format(event_key)

        request_data = {
            "X-TBA-Auth-Key" : tba_key,
            "If-Modified-Since": last_modified_since
        }

        match_schedule = requests.get(
            post_request_url, params = request_data
        )

        all_matches = match_schedule.json()

        #convert json data to dictionary with subdictionary for each alliance containing corresponding team numbers
        match_schedule_dict = {}
        for match in all_matches:
            match_schedule_dict[match['key']] = {
                "red": match['alliances']['red']['team_keys'],
                "blue": match['alliances']['blue']['team_keys']

            }

        #write match schedule to json file
        logger.info("Writing to match_schedule json.")
        with open('data/match_schedule.json', 'w', encoding='utf-8') as f:
            json.dump(match_schedule_dict, f, ensure_ascii=False, indent=4)

    @staticmethod
    def convert_CSV_To_Match_Schedule(
            logger: Logger
    ):
        #opens config file and gets event key
        logger.info("Getting configuration variables from config.json")
        try:
            with open("../config/config.json") as config:
                config = json.load(config)
            event_key = config["YEAR"] + config["EVENT_KEY"]

        except FileNotFoundError:
            logger.critical("config.json not found. Make sure it's located in the data subdirectory.")
            raise FileNotFoundError
        except NameError:
            logger.critical("event year, or event key not found. Please check config.json")
            raise NameError
        logger.info("Successfully retreived configuration variablees.")

        """

        If TBA is really not up, please edit the match schedule on this: https://docs.google.com/spreadsheets/d/1I5zE3oVeroPNFlDTpc4PspzlP8qkUWnA9Cngd_7N7K8/edit#gid=0
        and download the sheet as a csv and put it in data subdirectory.

        """
        logger.info("Opening match_schedule_sheet.csv")

        match_schedule_dict = {}
        with open("../data/match_schedule_sheet.csv") as file:
            header = next(file)
            match_schedule = csv.reader(file)

            logger.info("Found match_schedule sheet. Converting to JSON object now")

            #generates match schedule dictionary
            #match keys are the dict key and values are subdict with alliance as keys and list of teams as values
            for match in match_schedule:
                match_schedule_dict[f"{event_key}_{match[0]}"] = {
                    "red" : [
                        match[1],
                        match[2],
                        match[3]
                    ],
                    "blue": [
                        match[4],
                        match[5],
                        match[6]
                    ],
                }


        #converts to json and stores in data folder
        logger.info("Posting data to match_schedule.json located in the data folder.")
        with open('../data/match_schedule.json', 'w', encoding='utf-8') as f:
            json.dump(match_schedule_dict, f, ensure_ascii=False, indent=4)

        logger.info("Success!")

#DataVal(wifi_connection=True, match_schedule_JSON="data/match_schedule.json").validate_data(filepath="data/dcmp_data.csv")