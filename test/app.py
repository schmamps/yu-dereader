"""entry point"""
from flask import Flask
import pathlib
import json

from . import image, index


app = Flask(__name__)


def sort_pages(page) -> int:
    return int(page['comic'])


def load_pages():
    src = pathlib.Path(__file__).parent.joinpath('comics.json')
    with open(src, 'r') as handle:
        database = json.loads(handle.read())

    return sorted(database['pages'], key=sort_pages)


@app.route('/<path:name>.gif')
def gif(name):
    return image.gif(name)


@app.route('/<path:name>.jpg')
@app.route('/<path:name>.jpeg')
def jpg(name):
    return image.jpeg(name)


@app.route('/<path:name>.png')
def png(name):
    return image.png(name)


@app.route('/')
@app.route('/index.php')
def main():
    return index.main(load_pages())
