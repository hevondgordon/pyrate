from services.__internals__.env import CONFIG


def config_string():
    return "postgresql://{user}:{password}@{host}:{port}/{db}".format(**CONFIG)
