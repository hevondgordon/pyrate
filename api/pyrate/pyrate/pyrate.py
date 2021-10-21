import json
from services.user import routes, service
import importlib

import services

from flask import Flask
from flask import Response

app = Flask(__name__)


def test():
    print(routes.routes())

    _routes = routes.routes()
    get_requests = _routes.get('GET', {})
    get_request_keys = get_requests.keys()

    for key in get_request_keys:
        print(key)
        module = importlib.import_module(
            'services.user.service')
        func = getattr(module, key, lambda: Response(json.dumps(
            {'x': 'y'}), status=200, mimetype="application/json"))

        @app.route("/hello-me", methods=["GET"])
        def executor():
            func()

    @app.route("/test")
    def hello_world():
        return "Hello, World!"

    @app.route("/hello-me", methods=["GET"])
    def api_hello():
        data = {"hello": "world", "number": 3}
        js = json.dumps(data)

        resp = Response(js, status=200, mimetype="application/json")
        resp.headers["Link"] = "http://luisrei.com"

        return resp


if __name__ == "__main__":
    test()
    app.run(debug=True)
