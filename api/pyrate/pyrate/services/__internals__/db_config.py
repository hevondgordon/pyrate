from dotenv import load_dotenv
import os

load_dotenv()

print("loaded", os.getenv("HOST"))

CONFIG = {
    "host": os.getenv("HOST"),
    "port": os.getenv("PORT"),
    "user": os.getenv("USER"),
    "password": os.getenv("PASSWORD"),
    "db": os.getenv("DB"),
}


def config_string():
    return "postgresql://{user}:{password}@{host}:{port}/{db}".format(**CONFIG)
