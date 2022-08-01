from DataVal import DataVal
from Logger import Logger

def get_schedule():
    DataVal.get_match_schedule(Logger().log)

if __name__ == "__main__":
    get_schedule()