"""serve images"""
from flask import make_response
import io
import pathlib

from PIL import Image, ImageDraw, ImageFont


def serve(name):
    img_size = 735, 500
    fg = 218, 60, 61, 255
    bg = 0, 0, 0, 0
    xy = 30, 60
    font_path = pathlib.Path(__file__).parent.joinpath('Go-Mono-Bold.ttf')
    font_size = 24
    content = '> {0}'.format(name)

    if 'comic2-' in name:
        fg = 0, 0, 0, 255
        bg = 64, 187, 29, 255
        xy = 30, 30
        content = name
    elif 'logo5' in name:
        img_size = 390, 56
        fg = 255, 255, 255
        bg = 69, 136, 251
        xy = 10, 10
        content = 'Yu Dereader'
        font_size = 40
    elif 'utahchat2' in name:
        img_size = 16, 16
        bg = 253, 189, 85
        content = 'UR'
    elif 'trex-' in name:
        img_size = 15, 15
        bg = 74, 165, 43
        content = 'TR'
    elif 'htiead3' in name:
        img_size = 160, 600
        bg = 51, 135, 142
        xy = 0, 0
        content = 'new book!'
    elif 'favicon' in name:
        img_size = 32, 32
        xy = 0, 0
        bg = 74, 165, 43
        content = 'DC'

    base = Image.new('RGBA', img_size, bg)
    text = Image.new(base.mode, base.size, (0, 0, 0, 0))
    font = ImageFont.truetype(str(font_path), font_size)
    draw = ImageDraw.Draw(text)
    draw.text(xy, content, font=font, fill=fg)

    out = Image.alpha_composite(base, text)

    byteArr = io.BytesIO()
    out.save(byteArr, format='PNG')

    response = make_response(byteArr.getvalue())
    response.headers.set('Content-Type', 'image/png')

    return response
