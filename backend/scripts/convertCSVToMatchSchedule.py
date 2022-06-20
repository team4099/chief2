import json
import csv
from backend.Logger import Logger

logger = Logger()

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

logger.info("Posting data to match_schedule.json located in the data folder.")
with open('../data/match_schedule.json', 'w', encoding='utf-8') as f:
    json.dump(match_schedule_dict, f, ensure_ascii=False, indent=4)

logger.info("Success!")




