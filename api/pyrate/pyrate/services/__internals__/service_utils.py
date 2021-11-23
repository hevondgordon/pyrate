import os
import json
from services.__internals__.commons import get_service_resource, get_full_service_path
from services.__internals__.sql_alchemy_model_parser import hydrate_sql_alchemy_model


def create_service_file(service_name: str) -> None:
    service_path = get_service_resource(service_name, 'service.py')
    model_name = service_name.title()
    """ Creates a new service file """
    service_template = '''
import json
from flask import Response, request
from services.{service_name}.model import {model_name}


def find_{service_name}():
    {entity}s = {model_name}.query.all()

    json_{entity}s = [entity.to_dict() for entity in {entity}s]
    response = Response(json.dumps(json_{entity}s),
                        status=200, mimetype="application/json")
    return response


def find_single_{service_name}(*args, **kwargs):
    {entity} = {model_name}.query.filter_by(**kwargs).first().to_dict()
    return Response(json.dumps({entity}),
                    status=200, mimetype="application/json")


def create_{service_name}():
    data = json.loads(request.data.decode('UTF-8'))
    {service_name} = {model_name}(
        **data
    )

    {entity} = {service_name}.save_to_db()

    response = Response(json.dumps({entity}.to_dict()),
                        status=200, mimetype="application/json")
    return response


def update_{service_name}(*args, **kwargs):
    data = json.loads(request.data.decode('UTF-8'))
    {entity} = {model_name}.query.filter_by(id=kwargs.get('id')).first()
    keys = dict.keys(data)
    for key in keys:
        if key == 'id':
            continue
        setattr({entity}, key, data[key])
    {entity}.save_to_db()
    return Response(json.dumps({entity}.to_dict()),
                    status=200, mimetype="application/json")


def delete_{service_name}(*args, **kwargs):
    status = 200
    try:
        {entity} = {model_name}.query.filter_by(id=kwargs.get('id')).first()
        {entity}.delete_from_db()
    except Exception as e:
        status = 500
    return Response(status=status)

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
        'controller': 'find_{service_name}'
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
        print('Error: Creating route. ' + service_name)


def create_model_definitions(service_name: str, columns: list) -> None:
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
