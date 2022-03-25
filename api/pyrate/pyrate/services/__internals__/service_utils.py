import os
import json
from services.__internals__.commons import get_service_resource, get_full_service_path
from services.__internals__.sql_alchemy_model_parser import hydrate_sql_alchemy_model

def clean_service_name(service_name: str) -> str:
    clean_service_name = ''
    for char in service_name.lower():
        unicode_val = ord(char)
        if unicode_val != 95 and (unicode_val < 97 or unicode_val > 122):
            clean_service_name += '_'
        else:
            clean_service_name += char
    return clean_service_name

def create_service_file(service_name: str) -> None:
    service_path = get_service_resource(service_name, 'service.py')
    model_name = service_name.title()
    """ Creates a new service file """

    service_template = '''
import json
from flask import Response, request
from services.__internals__.query import create, get_all, update, delete, filter


json_mimetype = "application/json"

def find_all_{service_name}():
    response = []
    status = 200

    try:
        {entity} = get_all('{model_name}')
        response = Response(json.dumps({entity}),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

def find_single_{service_name}(**kwargs):
    response = []
    status = 200

    try:
        {entity} = filter('{model_name}', kwargs)
        if(len({entity}) > 0):
            response = Response(json.dumps({entity}[0]))
        else:
            response = Response(json.dumps({entity}),
                            status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

def create_{service_name}():
    response = []
    status = 200

    try:
        data = json.loads(request.data.decode('UTF-8'))
        {entity} = create('{model_name}', data)
        response = Response(json.dumps({entity}),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response


def update_{service_name}(**kwargs):
    response = []
    status = 200

    try:
        data = json.loads(request.data.decode('UTF-8'))
        {entity} = update('{model_name}', kwargs, data)
        response = Response(json.dumps({entity}),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response


def delete_{service_name}(**kwargs):
    response = []
    status = 200

    try:
        {entity} = delete('{model_name}', kwargs)
        response = Response(json.dumps({entity}),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

    '''.format(service_name=service_name, model_name=model_name, entity=model_name.lower())

    with open(service_path, 'w') as service_file:
        service_file.write(service_template)


def create_route(service_name: str) -> None:
    route_path = get_service_resource(service_name, 'routes.py')
    """ Creates a new route for the given service """
    print(route_path)
    route_template = '''
def routes():
    return [
        {'methods': ['GET'],
        'path': '/',
        'controller': 'find_all_{service_name}'
        },
        {'methods': ['GET'],
        'path': '/<int:id>',
        'controller': 'find_single_{service_name}'
        },
        {'methods': ['POST'],
        'path': '/',
        'controller': 'create_{service_name}'
        },
        {'methods': ['PUT'],
        'path': '/<int:id>',
        'controller': 'update_{service_name}'
        },
        {'methods': ['DELETE'],
        'path': '/<int:id>',
        'controller': 'delete_{service_name}'
        },
    ]
    '''.replace('{service_name}', service_name)
    try:
        with open(route_path, 'w') as route_file:
            route_file.write(route_template)
    except FileNotFoundError:
        print('Error Creating Route. ' + service_name)


def create_model_json_definitions(service_name: str, columns: list) -> None:
    json_file_path = get_service_resource(
        service_name, '__model__.json')
    model = {
        "service_name": service_name,
        "columns": columns
    }

    with open(json_file_path, 'w') as json_definition_file:
        json.dump(model, json_definition_file)


def create_model(service_name: str, columns: list) -> None:
    model_path = get_service_resource(service_name, 'model.py')
    hydrated_model = hydrate_sql_alchemy_model(service_name, columns)
    with open(model_path, 'w') as model_file:
        model_file.write(hydrated_model)


def create_directory(directory_name: str) -> None:
    "create a new directory at the given path if it doesn't already exist"
    service_path = get_full_service_path(directory_name)
    try:
        if not os.path.exists(service_path):
            os.makedirs(service_path)
    except OSError:
        print('Error: Creating service. ' + directory_name)
