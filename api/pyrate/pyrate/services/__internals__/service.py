import json
import os
import services

import services.__internals__.sql_alchemy_model_parser as sql_alchemy_model_parser
import services.__internals__.service_utils as service_utils
import services.__internals__.model_utils as model_utils

from flask import Response, request


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
            service_utils.create_model_definitions(service_name, columns)
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


def get_column_details():
    response = model_utils.get_model_definition('user')
    return Response(json.dumps(response),
                    status=200, mimetype="application/json")


def add_column_to_model():
    response = {
        "success": True,
    }
    status = 200
    column_data = json.loads(request.data.decode('UTF-8'))
    model = column_data.get('model', None)
    columns = column_data.get('columns', [])
    sql_alchemy_columns = [sql_alchemy_model_parser.create_sql_alchemy_column(
        column) for column in columns]

    try:
        sql_alchemy_model_parser.add_columns_to_sql_alchemy_model(
            model, sql_alchemy_columns
        )
        model_utils.update_model_definition(model, columns)

    except Exception as e:
        response['success'] = False
        status = 500
        response['error'] = {}
        response['error']['message'] = str(e)

    response = Response(json.dumps(response),
                        status=status, mimetype="application/json")
    return response
