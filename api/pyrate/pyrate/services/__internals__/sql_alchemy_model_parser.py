
import services.__internals__.utils as utils


def get_columns_from_sql_alchemy_model(model_name):
    model_path = utils.get_service_resource(model_name, 'model.py')
    with open(model_path, 'r') as model_file:
        model_file_contents = model_file.read()
        columns = []
        for line in model_file_contents.split('\n'):
            if 'db.Column' in line:
                columns.append(line)
    return columns


def create_sql_alchemy_column(column_details):
    '''takes a parameter in the format:

        column_details = {
            "name": "id",
            "type": "db.Integer",
            "other_options": {
                "primary_key": False,
                "nullable": True,
                "unique": False,
                ...
            }
        }

        and returns a string in the format:
        id = db.Column(db.Integer, primary_key=True,
                       nullable=True, unique=False)
    '''
    column_name = column_details.get('name', None)
    column_type = column_details.get('type', None)
    column_other_options = column_details.get('other_options', {})
    column_options_holder = []

    for key, value in column_other_options.items():
        column_options_holder.append(f'{key}={value}')

    column_other_options_string = ', '.join(column_options_holder)

    return f'{column_name} = db.Column({column_type}, {column_other_options_string})'


def add_columns_to_sql_alchemy_model(model_name, new_columns):
    model_path = utils.get_service_resource(model_name, 'model.py')
    columns = get_columns_from_sql_alchemy_model(model_name)
    formatted_new_columns = [f'    {column}' for column in new_columns]

    columns.extend(formatted_new_columns)
    columns_string = '\n'.join(columns)
    formatted_columns_string = f'{columns_string}\n'
    model_identifier = f'class {model_name.title()}'
    lines = get_model_lines_without_columns(model_path)

    class_definition_line = [
        line for line in lines if model_identifier in line][0]

    index_of_class_definition_line = lines.index(class_definition_line)
    lines.insert(index_of_class_definition_line + 1, formatted_columns_string)
    write_lines_to_file(lines, model_path)


def get_model_lines_without_columns(model_path):
    lines = []
    with open(model_path, 'r') as model_file:
        model_file_contents = model_file.readlines()
        lines = [line for line in model_file_contents if 'db.Column' not in line]
    return lines


def write_lines_to_file(lines, file_path):
    with open(file_path, 'w') as file:
        file.writelines(lines)
