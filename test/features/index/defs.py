"""Single View"""
from typing import NamedTuple


BIWRBR: str = 'butiwouldratherbereading'


class View(NamedTuple):
    query: str = ''
    src: str = ''
