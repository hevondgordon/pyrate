from dotenv import load_dotenv
import os

load_dotenv()


CONFIG = {
    "host": "db",
    "port": os.getenv("POSTGRES_PORT"),
    "user": os.getenv("POSTGRES_USER"),
    "password": os.getenv("POSTGRES_PASSWORD"),
    "db": os.getenv("POSTGRES_DB"),
    "sentry_endpoint": os.getenv("SENTRY_ENDPOINT"),
}
