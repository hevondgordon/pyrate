import importlib
import json

from app import app
from db import db
from flask import Response
from services.__internals__.pyrate import PyrateBase


class Pyrate(PyrateBase):
    def import_models(self):
        """
        Import all models from the services directory.
        """
        services = self.get_external_services()
        for service in services:
            if "__internals__" not in service:
                importlib.import_module(
                    "services.{service}.model".format(service=service)
                )

    def index(self):
        return Response(
            json.dumps(
                {
                    "message": "Welcome to Pyrate External Client!",
                    "services": self.get_external_services(),
                }
            ),
            mimetype="application/json",
        )

    def setup_db(self):
        """
        Setup the database.
        """
        self.import_models()
        db.create_all()

    def setup_app(self):
        # self.setup_db()
        services = self.get_external_services()
        for service in services:
            self.add_service_to_app(service)
        return self.app


configured_app = Pyrate(app).setup_app()


if __name__ == "__main__":
    configured_app.run(debug=True)
