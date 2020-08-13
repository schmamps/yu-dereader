"""Single View"""
from typing import NamedTuple


BIWRBR: str = 'butiwouldratherbereading'
DEFAULT_ID: int = 3626


class View(NamedTuple):
    query: str = ''
    src: str = ''
