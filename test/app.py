"""entry point"""
from flask import Flask

from .features import image, index

app = Flask(__name__)


@app.route('/comics/<path:name>.png')
def get_comic(name):
    return image.comic(name)


@app.route('/<path:name>.gif')
@app.route('/<path:name>.jpg')
@app.route('/<path:name>.png')
def get_image(name):
    return image.png(name)


@app.route('/<path:name>.php')
def get_page(name):
    return index.php(name)


@app.route('/')
def home():
    return get_page('index')
