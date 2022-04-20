
import json
from flask import Response, request
from services.__internals__.query import create, get_all, update, delete, filter


json_mimetype = "application/json"

def find_all_gregorypark():
    response = []
    status = 200

    try:
        gregorypark = get_all('Gregorypark')
        response = Response(json.dumps(gregorypark),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

def find_single_gregorypark(**kwargs):
    response = []
    status = 200

    try:
        gregorypark = filter('Gregorypark', kwargs)
        if(len(gregorypark) > 0):
            response = Response(json.dumps(gregorypark[0]))
        else:
            response = Response(json.dumps(gregorypark),
                            status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

def create_gregorypark():
    response = []
    status = 200

    try:
        data = json.loads(request.data.decode('UTF-8'))
        gregorypark = create('Gregorypark', data)
        response = Response(json.dumps(gregorypark),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response


def update_gregorypark(**kwargs):
    response = []
    status = 200

    try:
        data = json.loads(request.data.decode('UTF-8'))
        gregorypark = update('Gregorypark', kwargs, data)
        response = Response(json.dumps(gregorypark),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response


def delete_gregorypark(**kwargs):
    response = []
    status = 200

    try:
        gregorypark = delete('Gregorypark', kwargs)
        response = Response(json.dumps(gregorypark),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

    