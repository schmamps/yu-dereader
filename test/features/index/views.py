"""view lister"""
import re
import typing

from ...lib import data
from .defs import View


def get_default(view_list: typing.List[View]) -> int:
    for i, v in enumerate(view_list):
        if v.query == '':
            return i

    return 0


def get_view(view: dict) -> View:
    short = re.sub(r'[^a-z]+', '', view['name'].lower())

    return View(view.get('query', short), view.get('src', short))


def list_group(views: typing.List[dict]) -> typing.List[View]:
    return [get_view(view) for view in views]


def list_all() -> typing.List[View]:
    views = []
    for group in data.load('views'):
        views += list_group(group['views'])

    return views
