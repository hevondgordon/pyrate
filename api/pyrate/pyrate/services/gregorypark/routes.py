
def routes():
    return [
        {'methods': ['GET'],
        'path': '/',
        'controller': 'find_all_gregorypark'
        },
        {'methods': ['GET'],
        'path': '/<int:id>',
        'controller': 'find_single_gregorypark'
        },
        {'methods': ['POST'],
        'path': '/',
        'controller': 'create_gregorypark'
        },
        {'methods': ['PUT'],
        'path': '/<int:id>',
        'controller': 'update_gregorypark'
        },
        {'methods': ['DELETE'],
        'path': '/<int:id>',
        'controller': 'delete_gregorypark'
        },
    ]
    