
import json
from flask import Response, request
from services.__internals__.query import create, get_all, update, delete, filter


json_mimetype = "application/json"

def find_all_gregory():
    response = []
    status = 200

    try:
        gregory = get_all('Gregory')
        response = Response(json.dumps(gregory),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

def find_single_gregory(**kwargs):
    response = []
    status = 200

    try:
        gregory = filter('Gregory', kwargs)
        if(len(gregory) > 0):
            response = Response(json.dumps(gregory[0]))
        else:
            response = Response(json.dumps(gregory),
                            status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

def create_gregory():
    response = []
    status = 200

    try:
        data = json.loads(request.data.decode('UTF-8'))
        gregory = create('Gregory', data)
        response = Response(json.dumps(gregory),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response


def update_gregory(**kwargs):
    response = []
    status = 200

    try:
        data = json.loads(request.data.decode('UTF-8'))
        gregory = update('Gregory', kwargs, data)
        response = Response(json.dumps(gregory),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response


def delete_gregory(**kwargs):
    response = []
    status = 200

    try:
        gregory = delete('Gregory', kwargs)
        response = Response(json.dumps(gregory),
                        status=status, mimetype=json_mimetype)
    except Exception as e:
        status = 500
        response = Response(json.dumps(e),
                            status=status, mimetype=json_mimetype)
    return response

    