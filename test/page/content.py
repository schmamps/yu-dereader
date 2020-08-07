"""Content Generator"""
import urllib
import re
import typing

import arrow
import faker
import inflect


def get_date(page_id: int, default_id: int):
    increment = int(7.0 / 3.0 * (page_id - default_id))  # thrice weekly
    date = arrow.get(2020, 7, 29).shift(days=increment)

    return date.format('MMMM Do, YYYY')


def create_name(name: typing.Callable):
    while True:
        full_name = name()
        comps = full_name.split(' ')
        if len(comps) == 2:
            break

    return comps[0], full_name


def format_paragraph(para: str, vars):
    clean = re.sub(r'\s+', ' ', para).strip()

    return clean.format(*vars)


def create_panel(paras: typing.List[str], vars: typing.List[typing.Any]):
    return [format_paragraph(para, vars) for para in paras]


def pedant(word: str, suffocate=str):
    base = word[:int(len(word) * .667)]
    suffix = word[len(base):]

    return base + suffocate(suffix).upper()


def create_var(initial: str, create: typing.Callable):
    converted = create(initial)

    return converted if converted else initial


def compound(root: str, suffix: str):
    if root.endswith(suffix[0]):
        return root[:-1] + suffix

    return root + suffix


def generate(page_id: int, default_id: int) -> dict:
    eng = inflect.engine()
    faker.Faker.seed(page_id + 1)
    fake = faker.Faker(['en_CA'])
    title = fake.paragraph()
    contact = fake.paragraph()
    rss = fake.paragraph()
    angola, angola_maldives = create_name(fake.name)
    mixed_drinks = create_var(' '.join(fake.words(2)), eng.plural_noun)
    food = create_var(fake.word(), eng.singular_noun)
    streak = create_var(fake.word(), eng.singular_noun)
    light = create_var(fake.word(), eng.singular_noun)
    meteor = create_var(fake.word(), eng.singular_noun)
    meteoroid = compound(meteor, 'OID')
    meteorites = compound(meteor, 'ITES')
    asteroids = compound(create_var(fake.word(), eng.singular_noun), 'oids')

    panels = [
        create_panel(
            [
                '''{0}, the sexy super spy I invented, was yet again
                on a mission to save the world!''',
                #
                'Oh no, you guys!'
            ],
            [angola_maldives]
        ),
        create_panel(
            ['An evil mastermind is planning to smash {0} into the planet!'],
            [eng.plural_noun(meteor)]
        ),
        create_panel(
            [
                '''"Ah, then there's nothing to worry about,"
                {0} said while consuming stuff associated with
                being really cool like {1} that are hard to make
                and {2} that's very expensive and doesn't taste
                as good as a Big Mac anyway,
                "as a {3} is defined only as the {4} of {5}
                caused by a {6} travelling in atmosphere.
                Some {5} hitting our planet won't hurt anyone, yo.'''
            ],
            [angola, mixed_drinks, food, meteor, streak, light, meteoroid]
        ),
        create_panel(
            [
                '''"I think he actually meant {0} then!!"
                shouted {1}\'s boss!"''',
                #
                '"Again, no worries." said {1}.'
            ],
            [meteoroid, angola]
        ),
        create_panel(
            [
                ''''Most {0} break up inside the atmosphere.
                It's only {1} that ever reach the ground,
                and the vast majority of those
                are no larger than a grain of rice''',
                #
                '''"Okay. Weird. I guess I'm thinking about {2}?"
                said the boss.''',
                #
                '''"Correct," said {3}.''',
            ],
            [meteoroid + 'S', meteorites, asteroids, angola]
        ),
        create_panel(
            ['THE END', '{0} WILL RETURN'],
            [angola_maldives.upper()]
        )
    ]

    return {
        'date': get_date(page_id, default_id),
        'title': title,
        'contact': urllib.parse.quote(contact),
        'rss': rss,
        'panels': panels
    }
