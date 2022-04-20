
def routes():
    return [
        {'methods': ['GET'],
        'path': '/',
        'controller': 'find_all_gregory'
        },
        {'methods': ['GET'],
        'path': '/<int:id>',
        'controller': 'find_single_gregory'
        },
        {'methods': ['POST'],
        'path': '/',
        'controller': 'create_gregory'
        },
        {'methods': ['PUT'],
        'path': '/<int:id>',
        'controller': 'update_gregory'
        },
        {'methods': ['DELETE'],
        'path': '/<int:id>',
        'controller': 'delete_gregory'
        },
    ]
    