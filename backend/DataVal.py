from Logger import Logger
import pandas as pd


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

    def validate_submission(
            self,
            submission: dict
    ):
        """
        :param submission: One submission that is represented as a dictionary. Format of dictionary can be found here: https://www.notion.so/team4099/Inputs-and-Outputs-5bb9890784074aceb13c0b0f69c9ed47#815eccdac2904cb78f8bed5fbfe48d27
        :return: None
        """
        self.check_for_higher_than_six_ball_auto(submission)

    def validate_data(
            self,
            filepath: str
    ):
        """
        :param filepath: Filepath to csv that contains all the data. Ex: "data/dcmp_data.csv"
        :return: None
        """
        self.logger.info("Reading data from CSV")
        scoutingdf = pd.read_csv(filepath)
        self.logger.info("Success! CSV data has been read.")
        scoutingdict = scoutingdf.to_dict(orient='records')
        for submission in scoutingdict:
            self.check_for_higher_than_six_ball_auto(submission)

    # Submission specific validation

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

DataVal().validate_data(filepath="data/dcmp_data.csv")


