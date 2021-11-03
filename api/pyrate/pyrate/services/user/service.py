import json
from flask import Response, request
from services.user.model import User


def find():
    json_users = json.dumps(User.query.all())
    response = Response(json_users,
                        status=200, mimetype="application/json")
    return response


def find_one(*args, **kwargs):
    user = User.query.filter_by(**kwargs).first().to_dict()
    return Response(json.dumps(user),
                    status=200, mimetype="application/json")


def create():
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


def update(*args, **kwargs):
    data = json.loads(request.data.decode('UTF-8'))
    user = User.query.filter_by(id=kwargs.get('id')).first()
    user.update(**data)
    return Response(json.dumps(user),
                    status=200, mimetype="application/json")
