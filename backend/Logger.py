from colorlog import ColoredFormatter
import logging

class Logger():
    def __init__(self):
        self.log = logging.getLogger()
        self.log.setLevel(logging.INFO)

        format_str = '%(asctime)s.%(msecs)d | %(levelname)-8s |  [%(filename)s:%(lineno)d] %(message)s'
        date_format = '%Y-%m-%d %H:%M:%S'
        cformat = '%(log_color)s' + format_str
        colors = {'DEBUG': 'grey',
                  'INFO': 'green',
                  'WARNING': 'bold_yellow',
                  'ERROR': 'bold_orange',
                  'CRITICAL': 'bold_red'}
        formatter = ColoredFormatter(cformat, date_format,
                                              log_colors=colors)

        stream = logging.StreamHandler()
        stream.setFormatter(formatter)

        self.log = logging.getLogger('pythonConfig')
        self.log.addHandler(stream)

    def debug(self, message):
        self.log.debug(message)

    def info(self, message):
        self.log.info(message)

    def warn(self, message):
        self.log.warning(message)

    def error(self, message):
        self.log.error(message)

    def critical(self, message):
        self.log.critical(message)

