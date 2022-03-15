from services.__internals__.env import CONFIG


def config_string():
    return "postgresql://{user}:{password}@db:{port}/{db}".format(**CONFIG)
