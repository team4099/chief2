import json
import pandas as pd

teams_scouted = []

with open("../config/config.json") as config:
    config = json.load(config)
event_key = config["YEAR"] + config["EVENT_KEY"]

with open(f"data/{event_key}_match_data.csv", "r") as scoutingdf:
    for match in list(scoutingdf)[1:]:
        match_split = match.split(",")
        if len(match_split) > 2:
            print(match_split[1])
            raise ValueError
            teams_scouted.append(match_split[1]+"frc"+match_split[2])
    #matches_scouted.append(f"{event_key}_{scoutingdf[match]['Match Key']}{scoutingdf[match]['Team Number']}")


with open("../data/match_schedule.json") as f:
    match_schedule = json.load(f)

    for match in match_schedule:
        for team in match_schedule[match]["red"] + match_schedule[match]["blue"]:
            if match.split("_")[1] + str(team) not in teams_scouted:
                print("need to scout ",match.split("_")[1] + str(team))



    



