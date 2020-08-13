"""JSON utility"""
import json
from pathlib import Path

from flask import current_app as app


def get_data_dir() -> Path:
    root = Path(str(app.root_path)).parent.joinpath('src', 'data')

    return root


def load_json(name):
    full_path = get_data_dir().joinpath('{0}.json'.format(name))

    with open(full_path) as file:
        return json.loads(file.read())
