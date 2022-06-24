import json
import requests
from Logger import Logger

logger = Logger()

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