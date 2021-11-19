import json
import os
import services
import services.__internals__.utils as utils
import services.__internals__.sql_alchemy_model_parser as sql_alchemy_model_parser

from flask import Response, request


RESTART_SERVICE_COMMAND = 'supervisorctl restart pyrate'


def get_columns_from_sql_alchemy_model(model_name):
    model_path = utils.get_service_resource(model_name, 'model.py')
    with open(model_path, 'r') as model_file:
        model_file_contents = model_file.read()
        columns = []
        for line in model_file_contents.split('\n'):
            if 'db.Column' in line:
                columns.append(line)
    return columns


def create_service_file(service_name):
    service_path = utils.get_service_resource(service_name, 'service.py')
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


def create_route(service_name):
    route_path = utils.get_service_resource(service_name, 'routes.py')
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


def hydrate_model(model_name, columns):
    """ Creates a new model for the given service """

    properties = ''
    properties += 'id = db.Column(db.Integer, primary_key=True)\n\t'

    for column in columns:
        properties += f'{column.get("name")} = db.Column(db.{column.get("type")}, nullable={column.get("nullable", True)})\n\t'
    properties = properties.replace('\t', '    ')
    model_template = '''
from db import db
from services.__internals__.models import PyrateBaseModel


class {model_name}(db.Model, PyrateBaseModel):
    {properties}
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        return self
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return self.id
'''.replace('{model_name}', model_name.title()).replace('{properties}', properties)
    return model_template


def create_model(service_name, columns):
    model_path = utils.get_service_resource(service_name, 'model.py')
    hydrated_model = hydrate_model(service_name, columns)
    with open(model_path, 'w') as model_file:
        model_file.write(hydrated_model)


def create_directory(directory_name):
    "create a new directory at the given path if it doesn't already exist"
    service_path = utils.get_full_service_path(directory_name)
    try:
        if not os.path.exists(service_path):
            os.makedirs(service_path)
    except OSError:
        print('Error: Creating service. ' + directory_name)


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
            create_directory(service_name)
            create_model(service_name, columns)
            create_service_file(service_name)
            create_route(service_name)
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
    column_data = json.loads(request.data.decode('UTF-8'))
    new_columns = []
    for column in column_data:
        new_columns.append(sql_alchemy_model_parser.create_sql_alchemy_column(column))
