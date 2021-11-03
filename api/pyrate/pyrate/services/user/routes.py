def routes():
    return [
        {'methods': ['GET'],
         'path': '/',
         'controller': 'find'
         },
        {'methods': ['GET'],
         'path': '/<int:id>',
         'controller': 'find_one'
         },
        {'methods': ['POST'],
         'path': '/',
         'controller': 'create'
         },
        {'methods': ['PUT'],
         'path': '/<int:id>',
         'controller': 'update'
         }
    ]
