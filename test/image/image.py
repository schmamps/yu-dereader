"""serve images"""
from flask import make_response
import io
import pathlib
import random

from PIL import Image, ImageDraw, ImageFont


random.seed()


def get_view(images):
    keys = [k for k in images.keys() if k != 'comic']
    random.shuffle(keys)

    return ''.join(images[keys[0]])


def serve(name):
    size = 735, 500
    fg = 218, 60, 61, 255
    bg = 0, 0, 0, 0
    xy = 30, 60
    font_path = pathlib.Path(__file__).parent.joinpath('Go-Mono-Bold.ttf')
    content = f'> {name}'

    if 'comic2-' in name:
        fg = 0, 0, 0, 255
        bg = 64, 187, 29, 255
        xy = 30, 30
        content = name

    base = Image.new('RGBA', size, bg)
    text = Image.new(base.mode, base.size, (0, 0, 0, 0))
    font = ImageFont.truetype(str(font_path), 24)
    draw = ImageDraw.Draw(text)
    draw.text(xy, content, font=font, fill=fg)

    out = Image.alpha_composite(base, text)

    byteArr = io.BytesIO()
    out.save(byteArr, format='PNG')

    response = make_response(byteArr.getvalue())
    response.headers.set('Content-Type', 'image/png')

    return response


def gif(name):
    return serve(name)


def jpeg(name):
    return serve(name)


def png(name):
    return serve(name)
