
import json
from services.__internals__.commons import get_service_resource


def get_model_definition(model):
    json_model_path = get_service_resource(model, '__model__.json')
    data = {}
    with open(json_model_path, 'r') as json_file:
        data = json.load(json_file)

    return data


def update_model_definition(model: str, column_details: list) -> dict:
    model_definition = get_model_definition(model)
    columns = model_definition.get('columns', [])
    list_excluding_incoming_column = []
    new_column_names = [column.get('name') for column in column_details]

    list_excluding_incoming_column.extend(
        [column for column in columns if column.get(
            'name') not in new_column_names]
    )
    list_excluding_incoming_column.extend(
        column_details)

    model_definition['columns'] = list_excluding_incoming_column

    write_model_definition(model, model_definition)
    return model_definition


def write_model_definition(model, model_definition):
    json_model_path = get_service_resource(model, '__model__.json')
    with open(json_model_path, 'w') as json_file:
        json.dump(model_definition, json_file)
