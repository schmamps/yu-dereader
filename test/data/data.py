"""JSON utility"""
import json
import pathlib


def get_data_dir() -> pathlib.Path:
    return pathlib.Path(__file__).parent.parent.parent.joinpath('src', 'data')


def load_json(name):
    full_path = get_data_dir().joinpath('{0}.json'.format(name))

    with open(full_path) as file:
        return json.loads(file.read())
