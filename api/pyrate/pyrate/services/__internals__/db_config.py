CONFIG = {
    "host": "localhost",
    "port": 5432,
    "user": "pyrate",
    "password": "pyrate",
    "db": "pyrate",
}


def config_string():
    return "postgresql://{user}:{password}@{host}:{port}/{db}".format(**CONFIG)
