"""serve images"""
import io
from pathlib import Path

from flask import make_response
from PIL import Image, ImageDraw, ImageFont

from ...lib import content


CWD = Path(__file__).parent

SPEC = {
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
}  # type: dict


def get_base_config(name: str) -> dict:
    return {
        'img_size': (735, 500),
        'fg': (0, 0, 0, 255),
        'bg': (64, 187, 25, 255),
        'xy': (6, 6),
        'content': name
    }


def get_font(cfg: dict) -> ImageFont:
    font_path = str(cfg.get('font_path', CWD.joinpath('./luximr.ttf')))
    font_size = cfg.get('font_size', 24)

    return ImageFont.truetype(font_path, font_size)


def get_overlay(base: Image, color: tuple) -> Image:
    text = Image.new(base.mode, base.size, color)
    draw = ImageDraw.Draw(text)

    return text, draw


def comic(name: str):
    cfg = get_base_config(name)

    with open(str(CWD.joinpath('comic.png')), 'rb') as src:
        # TODO: cleanup, streamline with `png`
        comic = Image.open(src).convert(mode='RGBA')
        text, draw = get_overlay(comic, (0, 0, 0, 0))
        font = get_font({'font_size': 10})
        POS = [
            (10, 10), (250, 10), (380, 10),
            (10, 250), (200, 250), (500, 250)
        ]

        for idx, panel in enumerate(content.panels(name)):
            draw.text(
                POS[idx],
                panel,
                font=font,
                fill=cfg['fg'],
                spacing=3)

        out = Image.alpha_composite(comic, text)

        byteArr = io.BytesIO()
        out.save(byteArr, format='PNG')

        response = make_response(byteArr.getvalue())
        response.headers.set('Content-Type', 'image/png')

        return response


def png(name: str):
    cfg = get_base_config(name)

    for key in SPEC.keys():
        if key in name:
            cfg.update(SPEC[key])

            break

    base = Image.new('RGBA', cfg['img_size'], cfg['bg'])
    text, draw = get_overlay(base, (0, 0, 0, 0))
    font = get_font(cfg)
    draw.text(cfg['xy'], cfg['content'], font=font, fill=cfg['fg'])

    out = Image.alpha_composite(base, text)

    byteArr = io.BytesIO()
    out.save(byteArr, format='PNG')

    response = make_response(byteArr.getvalue())
    response.headers.set('Content-Type', 'image/png')

    return response
