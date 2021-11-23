def routes():
    return [
        {'methods': ['POST'],
         'path': '/generate_service',
         'controller': 'generate_service'
         },
        {'methods': ['GET'],
         'path': '/get_external_services',
         'controller': 'get_external_services'
         },
        {'methods': ['POST'],
         'path': '/add_column_to_model',
         'controller': 'add_column_to_model'
         },
        {'methods': ['GET'],
         'path': '/get_column_details',
         'controller': 'get_column_details'
         },

    ]
