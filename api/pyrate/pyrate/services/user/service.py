import json
from flask import Response, request
from services.user.model import User


def find_user():
    users = User.query.all()

    json_users = [user.to_dict() for user in users]

    response = Response(json.dumps(json_users),
                        status=200, mimetype="application/json")
    return response


def find_single_user(*args, **kwargs):
    user = User.query.filter_by(**kwargs).first().to_dict()
    return Response(json.dumps(user),
                    status=200, mimetype="application/json")


def create_user():
    data = json.loads(request.data.decode('UTF-8'))
    email = data.get('email')
    user = User(
        **data
    )

    user.save_to_db()

    committed_user = User.query.filter_by(email=email).first().to_dict()
    response = Response(json.dumps(committed_user),
                        status=200, mimetype="application/json")
    return response


def update_user(*args, **kwargs):
    data = json.loads(request.data.decode('UTF-8'))
    user = User.query.filter_by(id=kwargs.get('id')).first()
    keys = dict.keys(data)
    for key in keys:
        if key == 'id':
            continue
        setattr(user, key, data[key])
    user.save_to_db()
    return Response(json.dumps(user.to_dict()),
                    status=200, mimetype="application/json")
