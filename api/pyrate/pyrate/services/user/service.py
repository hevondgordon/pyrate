import json
from flask import Response, request
from services.user.model import User

def find():
    json_users = json.dumps(User.query.all())
    print(json_users)
    response = Response(json_users,
                        status=200, mimetype="application/json")
    return response


def findOne(*args, **kwargs):
    print(args, kwargs)


def create():
    data = json.loads(request.data.decode('UTF-8'))
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    username = data.get('username', None)
    password = data.get('password')

    user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        username=username,
        password=password
    )

    user.save_to_db()

    committed_user = User.query.filter_by(email=email).first().to_dict()
    response = Response(json.dumps(committed_user),
                        status=200, mimetype="application/json")
    return response


def update():
    pass
