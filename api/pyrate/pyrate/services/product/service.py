import json
from flask import Response


def product_index():
    return "Hello, Product World!"


def product_test():
    data = {"product": "world", "world": 3}
    js = json.dumps(data)

    resp = Response(js, status=200, mimetype="application/json")
    resp.headers["Link"] = "http://luisrei.com"

    return resp
