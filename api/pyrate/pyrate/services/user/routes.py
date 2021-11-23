
def routes():
    return [
        {'methods': ['GET'],
        'path': '/',
        'controller': 'find_user'
        },
        {'methods': ['GET'],
        'path': '/<int:id>',
        'controller': 'find_single_user'
        },
        {'methods': ['POST'],
        'path': '/',
        'controller': 'create_user'
        },
        {'methods': ['PUT'],
        'path': '/<int:id>',
        'controller': 'update_user'
        },
        {'methods': ['DELETE'],
        'path': '/<int:id>',
        'controller': 'delete_user'
        },
    ]
    