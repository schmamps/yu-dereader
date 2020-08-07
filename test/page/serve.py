"""index page"""
import typing

from flask import redirect, render_template, request

from .. import urly
from . import content, views

BIWRBR = 'butiwouldratherbereading'
DEFAULT_ID = 3626


def get_view_data(
    query: str
) -> typing.Tuple[typing.List[views.View], int]:
    view_list = views.list_all()
    valid_queries = [v.query for v in view_list]

    try:
        return view_list, valid_queries.index(query)
    except ValueError:
        pass

    return view_list, views.get_default(view_list)


def get_page_id_spec(query) -> typing.Optional[int]:
    try:
        return int(query)
    except (TypeError, ValueError):
        return None


def get_comic_data(
    query: str,
    view: views.View
) -> typing.Tuple[int, urly.Url]:
    url = urly.Url('/index.php')
    url.query[BIWRBR] = view.query

    id_spec = get_page_id_spec(query)
    if id_spec is not None:
        url.query['comic'] = abs(id_spec)

    return id_spec or DEFAULT_ID, url


def get_page_base(page_id: int, view: views.View) -> dict:
    canon_src = '/comics/comic2-{0}.png'.format(page_id)

    return {
        'id': page_id,
        'canon': canon_src,
        'src': '/{0}.png'.format(view.src) if view.src else canon_src,
    }


def get_page_nav(
    relative_url: urly.Url,
    page_id: int,
) -> typing.Dict[str, str]:
    nav = urly.Url(str(relative_url))

    nav.query['comic'] = page_id - 1
    prev = str(nav)

    nav.query['comic'] = page_id + 1
    next = str(nav)

    return {'prev': prev, 'next': next}


def serve_page(page_id: int, url: urly.Url, view: views.View):
    return render_template(
        'index.j2',
        page=get_page_base(page_id, view),
        nav=get_page_nav(url, page_id),
        content=content.generate(page_id, DEFAULT_ID)
    )


def serve():
    url_spec = urly.Url.from_request(request)
    url_spec.query = dict(request.args)

    view_list, view_idx = get_view_data(url_spec.query.get(BIWRBR, ''))
    page_id, url_actual = get_comic_data(
        url_spec.query.get('comic'),
        view_list[view_idx]
    )

    if url_spec != url_actual:
        print('redirect: {0} -> {1}'.format(url_spec, url_actual))
        return redirect(str(url_actual), 302)

    return serve_page(page_id, url_actual, view_list[view_idx])
