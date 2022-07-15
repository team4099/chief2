import pandas as pd
import json
import openpyxl

def convertCSV():
    with open("config/config.json") as config:
        config = json.load(config)
        event_key = config["YEAR"] + config["EVENT_KEY"]

    # The read_csv is reading the csv file into Dataframe
    
    df = pd.read_csv(f'data/{event_key}_match_data.csv')
    
    # then to_excel method converting the .csv file to .xlsx file.
    
    df.to_excel(f'data/{event_key}_match_data.xlsx', sheet_name="Testing", index=False)


if __name__ == "__main__":
    convertCSV()