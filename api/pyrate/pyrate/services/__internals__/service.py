import json
import os
import services

import services.__internals__.sql_alchemy_model_parser as sql_alchemy_model_parser
import services.__internals__.service_utils as service_utils

from flask import Response, request

from services.user.model import User


RESTART_SERVICE_COMMAND = 'supervisorctl restart pyrate'


def get_external_services():
    """
    Returns a list of all folders in the services directory.
    """
    external_services = [
        package
        for package in os.listdir(services.__path__[0])
        if os.path.isdir(os.path.join(services.__path__[0], package))
        and package != '__pycache__' and package != '__internals__'
    ]

    return Response(json.dumps(external_services),
                    status=200, mimetype="application/json")


def generate_service():
    data = json.loads(request.data.decode('UTF-8'))
    columns = data.get('columns', [])
    status = 200
    response = {'success': True}
    service_name = data.get('service_name', None)
    if service_name is not None:
        try:
            service_name = service_name.lower()
            service_utils.create_directory(service_name)
            service_utils.create_model(service_name, columns)
            service_utils.create_service_file(service_name)
            service_utils.create_route(service_name)
        except Exception as e:
            response['success'] = False
            status = 500
            response['error'] = {}
            response['error']['message'] = str(e)
        else:
            os.system(RESTART_SERVICE_COMMAND)
    else:
        status = 400
        response['success'] = False
        response['error'] = {}
        response['error']['message'] = 'Service name is required.'

    response = Response(json.dumps(response),
                        status=status, mimetype="application/json")
    return response


def add_column_to_model():
    print(User.get_columns())
    column_data = json.loads(request.data.decode('UTF-8'))
    new_columns = []
    for column in column_data:
        new_columns.append(
            sql_alchemy_model_parser.create_sql_alchemy_column(column))
    sql_alchemy_model_parser.add_columns_to_sql_alchemy_model(
        'user', new_columns)
    response = Response(json.dumps({"success": True}),
                        status=200, mimetype="application/json")
    return response
