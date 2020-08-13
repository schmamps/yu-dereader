"""serve images"""
import io
from pathlib import Path

from flask import make_response
from PIL import Image, ImageDraw, ImageFont


SPEC = {
    'comic2-': {
        'fg': (0, 0, 0, 255),
        'bg': (64, 187, 29, 255),
        'xy': (30, 30)
    },
    'logo5': {
        'img_size': (390, 56),
        'fg': (255, 255, 255),
        'bg': (69, 136, 251),
        'xy': (10, 10),
        'content': 'Yu Dereader',
        'font_size': 40,
    },
    'trex-': {
        'img_size': (15, 15),
        'bg': (74, 165, 43),
        'content': 'TR'
    },
    'utahchat2': {
        'img_size': (16, 16),
        'bg': (253, 189, 85),
        'content': 'UR'
    },
    'htiead3': {
        'img_size': (160, 600),
        'bg': (51, 135, 142),
        'xy': (0, 0),
        'content': 'new book!'
    },
    'favicon': {
        'img_size': (32, 32),
        'xy': (0, 0),
        'bg': (74, 165, 43),
        'content': 'DC'
    },
    'pteranodon': {
        'img_size': (150, 138),
        'bg': (164, 197, 197)
    },
    'rhamphorhynchus': {
        'img_size': (180, 110),
        'bg': (117, 182, 117)
    }
}


def png(name):
    cfg = {
        'img_size': (735, 500),
        'fg': (0, 0, 0, 255),
        'bg': (64, 187, 25, 255),
        'xy': (30, 30),
        'content': name,
        'font_path': Path(__file__).parent.joinpath('./Go-Mono-Bold.ttf'),
        'font_size': 24
    }

    for key in SPEC.keys():
        if key in name:
            cfg.update(SPEC[key])

            break

    base = Image.new('RGBA', cfg['img_size'], cfg['bg'])
    text = Image.new(base.mode, base.size, (0, 0, 0, 0))
    font = ImageFont.truetype(str(cfg['font_path']), cfg['font_size'])
    draw = ImageDraw.Draw(text)
    draw.text(cfg['xy'], cfg['content'], font=font, fill=cfg['fg'])

    out = Image.alpha_composite(base, text)

    byteArr = io.BytesIO()
    out.save(byteArr, format='PNG')

    response = make_response(byteArr.getvalue())
    response.headers.set('Content-Type', 'image/png')

    return response
