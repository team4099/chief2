from ..DataVal import DataVal
from Logger import Logger

def get_schedule():
    DataVal.convert_CSV_To_Match_Schedule(Logger().log)

if __name__ == "__main__":
    get_schedule()