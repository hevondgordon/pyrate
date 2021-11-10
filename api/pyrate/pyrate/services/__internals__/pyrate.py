import json
import importlib
import services
import os

from flask import Response
from client_app import client_app
from db import db


class PyrateBase:
    app = None

    def __init__(self, app=None):
        if app is not None:
            self.init_app(app)

    def init_app(self, app):
        if self.app is None:
            self.app = app
            self.app.add_url_rule(
                '/',
                view_func=self.index,
                methods=['GET'])

    def index(self):
        return Response(
            json.dumps({
                'message': 'Welcome to Pyrate!',
                'services': self.get_external_services()
            }),
            mimetype='application/json'
        )

    def get_external_services(self):
        """
        Returns a list of all folders in the services directory.
        """
        return [
            package
            for package in os.listdir(services.__path__[0])
            if os.path.isdir(os.path.join(services.__path__[0], package))
            and package != '__pycache__' and package != '__internals__'
        ]

    def get_internal_services(self):
        """
        Returns the __internals__ directory.
        """
        return [
            package
            for package in os.listdir(services.__path__[0])
            if os.path.isdir(os.path.join(services.__path__[0], package))
            and package == '__internals__'
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
            self.app.add_url_rule(
                url, provide_automatic_options=True, view_func=view, methods=methods,)

    def setup_internal_app(self):
        services = self.get_internal_services()
        for service in services:
            self.add_service_to_app(service)
        return self.app

    def run(self, *args, **kwargs):
        """
        Run the app.
        """
        self.app.run(**kwargs)
        return self.app


configured_client_app = PyrateBase(client_app).setup_internal_app()
