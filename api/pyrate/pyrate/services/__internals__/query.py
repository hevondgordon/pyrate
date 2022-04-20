import psycopg2
from psycopg2.extras import RealDictCursor
from services.__internals__.db_config import config_string


def connect_to_db():
    """
    Connect to the database
    """
    conn = None
    _config_string = config_string()
    try:
        conn = psycopg2.connect(_config_string)
        conn.autocommit = True
    except Exception as e:
        print(e)

    return conn


def execute_query(query):
    """
    executes a query against a postgres database
    """

    connection = connect_to_db()
    if connection:
        cursor = connection.cursor(cursor_factory=RealDictCursor)
        try:
            cursor.execute(query)
            connection.commit()
        except Exception as e:
            print(e)
            return False
        return cursor

    raise Exception("Could not connect to database")


def drop_model(model_name):
    """
    Drop a model from the database
    """
    query = """
        DROP TABLE IF EXISTS {};
    """.format(
        model_name
    )

    cursor = execute_query(query)
    cursor.close()


def create_model(model_name, model_fields):
    """
    Create a model in the database
    """
    query = """
        CREATE TABLE IF NOT EXISTS {} (
            id SERIAL PRIMARY KEY,
            {}
        );
    """.format(
        model_name, create_model_fields(model_fields)
    )

    cursor = execute_query(query)
    if cursor != False:
        cursor.close()
        return True
    return cursor


def create_model_fields(model_fields):
    """
    creates postgres fields based on the provided model_fields
    """
    _model_fields = [create_model_field(model_field) for model_field in model_fields]
    return ",\n".join(_model_fields)


def create_model_field(model_field_data: dict):
    """
    creates a single postgres field
    """

    field_name = model_field_data.get("name")
    field_type = model_field_data.get("type")
    nullable = model_field_data.get("nullable", "")
    default = model_field_data.get("default", "")
    unique = model_field_data.get("unique", "")
    field_length = model_field_data.get("field_length", None)

    if nullable.lower() == "false":
        nullable = "NOT NULL"

    if unique.lower() == "true":
        unique = "UNIQUE"

    if default.lower() == "true":
        default = "DEFAULT '{}'".format(default)

    if field_length is None:
        field_length = 255

    if field_type.lower() == "varchar":
        field_type = "varchar({})".format(field_length)

    return f"{field_name} {field_type} {nullable} {default} {unique}".strip()


def format_data_values(data: dict):
    """
    formats data values for db
    """
    param_values = data.values()

    string_values = [f"'{param}'" for param in param_values if isinstance(param, str)]

    non_string_values = [
        param for param in param_values if isinstance(param, str) == False
    ]

    return string_values + non_string_values


def format_data_into_expresion_for_db(data: dict):
    """
    formats data into expression for db
    """
    param_names = data.keys()

    string_values = [
        f"{param} = '{data[param]}'"
        for param in param_names
        if isinstance(data[param], str)
    ]

    non_string_values = [
        f"{param} = {data[param]}"
        for param in param_names
        if isinstance(data[param], str) == False
    ]

    return string_values + non_string_values


def create(model_name: str, data: dict):
    """
    Create a model in the database
    """

    columns = ",\n".join(data.keys())
    values = ",\n".join(format_data_values(data))
    query = """
        INSERT INTO {} (
            {}
        ) VALUES (
            {}
        ) RETURNING *;
    """.format(
        model_name, columns, values
    )

    try:
        with execute_query(query) as cursor:
            return cursor.fetchall()
    except Exception as e:
        print(e)
        return []


def get_all(model_name):
    """
    Get a model from the database
    """
    query = """
        SELECT * FROM {};
    """.format(
        model_name
    )
    try:
        with execute_query(query) as cursor:
            return cursor.fetchall()
    except Exception as e:
        print(e)
        return []


def filter(model_name: str, filter_data: dict):
    """
    Filter a model from the database
    """

    formatted_data = format_data_into_expresion_for_db(filter_data)
    filter_param_string = " AND\n".join(formatted_data)

    query = """
        SELECT * FROM {} WHERE {};
    """.format(
        model_name, filter_param_string
    )

    try:
        with execute_query(query) as cursor:
            return cursor.fetchall()
    except Exception as e:
        print(e)
        return []


def update(model_name: str, filter_data: dict, update_data: dict):
    """
    Update a model in the database
    """

    formatted_data = format_data_into_expresion_for_db(update_data)
    formatted_filter_data = format_data_into_expresion_for_db(filter_data)
    update_data_string = ", ".join(formatted_data)
    filter_data_string = " AND ".join(formatted_filter_data)

    query = """
        UPDATE {} SET {} WHERE {} RETURNING *;
    """.format(
        model_name, update_data_string, filter_data_string
    )

    try:
        with execute_query(query) as cursor:
            return cursor.fetchall()
    except Exception as e:
        print(e)
        return []


def delete(model_name: str, filter_data: dict):
    """
    Delete a model from the database
    """

    formatted_data = format_data_into_expresion_for_db(filter_data)
    filter_data_string = " AND ".join(formatted_data)

    query = """
        DELETE FROM {} WHERE {} RETURNING *;
    """.format(
        model_name, filter_data_string
    )

    try:
        with execute_query(query) as cursor:
            return cursor.fetchall()
    except Exception as e:
        print(e)
        return []
