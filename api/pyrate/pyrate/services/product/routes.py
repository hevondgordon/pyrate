def routes():
    return [
        {'methods': ['GET'],
         'path': '/product_index',
         'controller': 'product_index'
         },
        {'methods': ['GET'],
         'path': '/product_test',
         'controller': 'product_test'
         }
    ]
