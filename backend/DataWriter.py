import pandas as pd

from DataReader import DataReader


class DataWriter:
    _HEADERS_CSV = (
        "Scout ID,Match Key,Team Number,Alliance,Driver Station,Preloaded Cargo,Auto Lower Hub,Auto Upper Hub,"
        "Auto Misses,Taxied,Auto Shooting Zones,Teleop Lower Hub,Teleop Upper Hub,Teleop Misses,Teleop Shooting Zones,"
        "Low Attempted,Mid Attempted,High Attempted,Traversal Attempted,Climb Time,Final Climb Type,"
        "How much do they play defense?,Defense Rating,"
        "How much were they playing through defense?,Counter Defense Rating,Driver Rating"
    )

    def write_data(self, year):
        result_json = DataReader(0).read_qrcode()

        for json in result_json:
            csv_formatted = ",".join([str(value or "") for value in json.values()])

            try:
                with open(f"{year}_{json['match_key']}.csv", "r+") as file:
                    if csv_formatted not in file.read():
                        file.write(csv_formatted + "\n")
            except FileNotFoundError:
                with open(f"{year}_{json['match_key']}.csv", "w") as file:
                    file.write(self._HEADERS_CSV + "\n")
                    file.write(csv_formatted + "\n")


DataWriter().write_data(2022)
