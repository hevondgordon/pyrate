import services
import os


def get_full_service_path(directory_name):
    return os.path.join(services.__path__[0], directory_name)


def get_service_resource(service_name, resource_name):
    return os.path.join(get_full_service_path(service_name), resource_name)
