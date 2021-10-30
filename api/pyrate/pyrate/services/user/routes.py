def routes():
    return [
        {'methods': ['GET'],
         'path': '/',
         'controller': 'index'
         },
        {'methods': ['GET'],
         'path': '/test',
         'controller': 'test'
         }
    ]
