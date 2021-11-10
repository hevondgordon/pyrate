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

    ]
