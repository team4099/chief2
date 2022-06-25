import pandas as pd


class DataWriter:
    _HEADERS_CSV = (
        "Scout ID,Match Key,Team Number,Alliance,Driver Station,Preloaded Cargo,Auto Lower Hub,Auto Upper Hub,"
        "Auto Misses,Taxied,Auto Shooting Zones,Teleop Lower Hub,Teleop Upper Hub,Teleop Misses,Teleop Shooting Zones,"
        "Low Attempted,Mid Attempted,High Attempted,Traversal Attempted,Climb Time,Final Climb Type,"
        "How much do they play defense?,Defense Rating,"
        "How much were they playing through defense?,Counter Defense Rating,Driver Rating"
    )

    def write_data(self, year):
        result_json = {'scout_id': 'pranav', 'match_key': 'qm3', 'team_number': 1719, 'alliance': 'Red', 'driver_station': 2, 'preloaded_cargo': 1, 'auto_lower_hub': 5, 'auto_upper_hub': 5, 'auto_misses': 0, 'taxied': 1, 'auto_shooting_zones': 'Tarmac', 'teleop_lower_hub': None, 'teleop_upper_hub': 1, 'teleop_misses': 5, 'teleop_shooting_zones': 'Elsewhere', 'attempted_low': None, 'attempted_mid': 1, 'attempted_high': None, 'attempted_traversal': None, 'climb_time': 1, 'final_climb_type': 'No Climb', 'defense_pct': None, 'counter_defense_pct': None, 'defense_rating': None, 'counter_defense_rating': None, 'driver_rating': None}
        csv_formatted = ",".join([str(value or "") for value in result_json.values()])

        try:
            with open(f"{year}_{result_json['match_key']}.csv", "r+") as file:
                if csv_formatted not in file.read():
                    file.write(csv_formatted + "\n")
        except FileNotFoundError:
            with open(f"{year}_{result_json['match_key']}.csv", "w") as file:
                file.write(self._HEADERS_CSV + "\n")
                file.write(csv_formatted + "\n")


DataWriter().write_data(2022)
