from colorlog import ColoredFormatter
import logging

class Logger():
    def __init__(self):
        self.log = logging.getLogger()
        self.log.setLevel(logging.DEBUG)

        format_str = '%(asctime)s.%(msecs)d | %(levelname)-8s |  [%(filename)s:%(lineno)d] %(message)s'
        date_format = '%Y-%m-%d %H:%M:%S'
        cformat = '%(log_color)s' + format_str
        colors = {'DEBUG': 'green',
                  'INFO': 'white',
                  'WARNING': 'bold_yellow',
                  'ERROR': 'bold_red',
                  'CRITICAL': 'bold_purple'}
        formatter = ColoredFormatter(cformat, date_format,
                                              log_colors=colors)

        stream = logging.StreamHandler()
        stream.setFormatter(formatter)

        self.log = logging.getLogger('logger')
        if (self.log.hasHandlers()):
            self.log.handlers.clear()
        self.log.addHandler(stream)

        file_handler = logging.FileHandler(f'logs/datalog.log')
        file_handler.setLevel(logging.DEBUG)
        file_handler.setFormatter(formatter)

        self.log.addHandler(file_handler)


