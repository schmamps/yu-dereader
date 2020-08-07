"""entry point"""
from flask import Flask

from . import image
from . import page


app = Flask(__name__)


@app.route('/<path:name>.gif')
@app.route('/<path:name>.jpg')
@app.route('/<path:name>.png')
def png(name):
    return image.serve(name)


@app.route('/')
@app.route('/index.php')
@app.route('/futurecomic.php')
def main():
    return page.serve()
