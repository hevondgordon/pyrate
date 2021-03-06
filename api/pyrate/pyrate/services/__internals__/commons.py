import os
import services


def get_full_service_path(directory_name: str) -> str:
    return os.path.join(services.__path__[0], directory_name)


def get_service_resource(service_name: str, resource_name: str) -> str:
    return os.path.join(get_full_service_path(service_name), resource_name)
