import json
from flask import Response


def index():
    return "Hello, World!"


def test():
    data = {"hello": "world", "number": 3}
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype="application/json")
    resp.headers["Link"] = "http://luisrei.com"

    return resp
