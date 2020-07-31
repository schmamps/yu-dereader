"""index page"""
import html
from pathlib import Path

from flask import render_template, request


def get_requested_index(pages):
    get_id = request.args.get('comic')
    matches = [i for i, p in enumerate(pages) if str(p['comic']) == get_id]

    if len(matches):
        return matches[0]

    return len(pages) - 1


def get_post(post_id):
    src_dir = Path(__file__).parent.parent.joinpath('comics')

    with open(src_dir.joinpath('{0}.html'.format(post_id)), 'r') as post:
        return post.read()


def create_attr(attr_name, attr_val):
    return '='.join(map(
        html.escape,
        [attr_name, attr_val]
    ))


def create_href(href):
    return create_attr('href', href)


def get_index_href(pages, index):
    if (index >= 0 and len(pages) - index >= 1):
        return create_href(''.join([
            '/index.php?comic=',
            str(pages[index]['comic'])
        ]))

    return create_href('futurecomic.php')


def main(pages):
    # base = get_base_href()
    idx = get_requested_index(pages)
    page = pages[idx]
    page['src'] = create_attr('src', f"comics/comic2-{page['img']}.png")
    page['original'] = page['img']
    page['prev'] = get_index_href(pages, idx - 1)
    page['next'] = get_index_href(pages, idx + 1)

    return render_template('{0}.j2'.format(page['post']), page=page)
