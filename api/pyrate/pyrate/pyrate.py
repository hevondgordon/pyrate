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


def import_models():
    """
    Import all models from the services directory.
    """
    services = get_services()
    for service in services:
        if '__internals__' not in service:
            importlib.import_module(
                'services.{service}.model'.format(
                    service=service)
            )


def get_services():
    """
    Returns a list of all folders in the services directory.
    """
    return [
        package
        for package in os.listdir(services.__path__[0])
        if os.path.isdir(os.path.join(services.__path__[0], package))
        and package != '__pycache__'
    ]


def get_routes_for_service(service_name):
    """get all routes for a given service """
    routes = importlib.import_module(
        'services.{service_name}.routes'.format(
            service_name=service_name)
    ).routes()

    return routes


def get_service_method_by_name(service_name, method_name):
    """get a service method by name"""
    module_name = 'services.{service_name}.service'.format(
        service_name=service_name)

    modules = importlib.import_module(
        module_name
    )

    return getattr(modules, method_name, None)


def setup_app():
    import_models()
    db.create_all()
    services = get_services()
    for service in services:
        _routes = get_routes_for_service(service)
        for route in _routes:
            controller = route.get('controller')
            path = route.get('path')
            if path[0] != '/':
                path = '/' + path
            methods = route.get('methods')
            view = get_service_method_by_name(service, controller)
            url = '/{service}{path}'.format(service=service,
                                            path=path)
            app.add_url_rule(
                url, provide_automatic_options=True, view_func=view, methods=methods,)


if __name__ == "__main__":
    setup_app()
    app.run(debug=True)
