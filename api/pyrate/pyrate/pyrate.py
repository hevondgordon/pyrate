import json
from services.user import routes, service
import services
import importlib

import services

from flask import Flask
from flask import Response
import os

from app import app

from db import db


class Pyrate:
    def __init__(self, app=None):
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        self.app = app
        self.app.add_url_rule(
            '/',
            view_func=self.index,
            methods=['GET'])

    def index(self):
        return Response(
            json.dumps({
                'message': 'Welcome to Pyrate!',
                'services': self.get_services()
            }),
            mimetype='application/json'
        )

    def import_models(self):
        """
        Import all models from the services directory.
        """
        services = self.get_services()
        for service in services:
            if '__internals__' not in service:
                importlib.import_module(
                    'services.{service}.model'.format(
                        service=service)
                )

    def get_services(self):
        """
        Returns a list of all folders in the services directory.
        """
        return [
            package
            for package in os.listdir(services.__path__[0])
            if os.path.isdir(os.path.join(services.__path__[0], package))
            and package != '__pycache__'
        ]

    def get_routes_for_service(self, service_name):
        """get all routes for a given service """
        routes = importlib.import_module(
            'services.{service_name}.routes'.format(
                service_name=service_name)
        ).routes()

        return routes

    def get_service_method_by_name(self, service_name, method_name):
        """get a service method by name"""
        module_name = 'services.{service_name}.service'.format(
            service_name=service_name)

        modules = importlib.import_module(
            module_name
        )

        return getattr(modules, method_name, None)

    def setup_db(self):
        """
        Setup the database.
        """
        self.import_models()
        db.create_all()

    def add_service_to_app(self, service_name):
        """
        Add a service to the app.
        """
        _routes = self.get_routes_for_service(service_name)
        for route in _routes:
            controller = route.get('controller')
            path = route.get('path')
            if path[0] != '/':
                path = '/' + path
            methods = route.get('methods')
            view = self.get_service_method_by_name(service_name, controller)
            url = '/{service}{path}'.format(service=service_name,
                                            path=path)
            app.add_url_rule(
                url, provide_automatic_options=True, view_func=view, methods=methods,)

    def setup_app(self):
        self.setup_db()
        services = self.get_services()
        for service in services:
            self.add_service_to_app(service)

    def run(self):
        """
        Run the app.
        """
        self.setup_app()
        self.app.run(debug=True)


if __name__ == "__main__":
    Pyrate(app).run()
