from services.__internals__.pyrate import configured_internal_app

if __name__ == '__main__':
    configured_internal_app.run(debug=True, port=5001)
