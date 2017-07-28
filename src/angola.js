(() => {
	'use strict';

	const getComicElement = () => {
		const sel = 'center > table tr > td:nth-child(2) > img';
		const elem = document.querySelector(sel);

		return (elem) ? elem : false;
	};

	const compose = (...funcs) => (value) => (
		funcs.reduce((val, fn) => fn(val), value)
	);

	const params = {
		cache: {},

		addPairToParams: (params, pair) => {
			const [name, val = ''] = pair;
			params[name] = val;

			return params;
		},

		native: (location) => Array.from(
			new URL(location).searchParams.entries()
		),

		splitSearch: (search) => search.substr(1).split('&'),

		splitItem: (item) => item.split('='),

		splitItems: (items) => items.map(params.splitItem),

		shim: (location) => {
			const chain = compose(params.splitSearch, params.splitItems);
			const pairs = chain(location.search);

			return pairs;
		},

		init: () => {
			const loc = document.location;
			const pairs = (window.URL) ? params.native(loc) : params.shim(loc);

			params.cache = pairs.reduce(params.addPairToParams, {});
		},

		get: (name, defaultValue) => (
			(name in params.cache) ? params.cache[name] : defaultValue
		),
	};

	const select = {
		Title: (elem) => {
			return elem;
		},

		Contact: () => {
			return document.querySelector('.topnav a[href^=mailto]');
		},

		RSS: () => {
			const xPath = '//body//comment()[contains(., \'rss-title\')]';

			return document.evaluate(xPath, document, null, 0).iterateNext();
		},
	};

	const process = {
		Title: (elem) => {
			const original = elem.getAttribute('title');
			const next = 'DOUBLE CLICK FOR MORE AWESOME FUN TIMES!';

			elem.setAttribute('title', next);
			elem.dataset.title = next;

			return original;
		},

		Contact: (elem) => {
			const re = /^.*subject=/;
			const subject = elem.getAttribute('href').replace(re, '');

			try {
				return decodeURIComponent(subject);
			}
			catch (e) {
				return subject;
			}
		},


		RSS: (elem) => elem.data.trim(),
	};

	const generate = {
		getChildren: (...all) => ([].
			concat(document.createElement('li')).
			concat(all.map((name) => document.createElement(name)))
		),

		appendTo: (parent) => (children) => {
			[].concat(children).map((child) => parent.appendChild(child));

			return parent;
		},

		listItem: (li, ...children) => {
			const ul = document.querySelector('.clutch ul');
			const appendSubs = generate.appendTo(li);
			const appendItem = generate.appendTo(ul);

			Promise.resolve(appendSubs(children)).then(appendItem);
		},

		basic: (name) => (value) => {
			const [li, strong, div] = generate.getChildren('strong', 'div');

			strong.textContent = name;
			div.innerHTML = value;

			generate.listItem(li, strong, div);
		},

		anchor: (name) => (document.
			querySelector('#blogpost center > a').
			setAttribute('name', name)
		),

		getPost: () => document.getElementById('blogpost'),

		scroll: () => generate.getPost().classList.add('angola'),

		transitionEnd: () => generate.getPost().classList.remove('angola'),

		monkey: () => {
			const post = generate.getPost();
			const pad = document.documentElement.clientHeight - 200;

			post.addEventListener('transitionend', generate.transitionEnd);
			document.getElementById('container').style.minHeight = pad + 'px';
		},
	};

	generate.Title = generate.basic('Title');
	generate.Contact = generate.basic('Contact');
	generate.RSS = (value) => {
		const href = '#angola-maldives';
		const [li, strong, a] = generate.getChildren('strong', 'a');

		strong.textContent = 'RSS';
		a.innerHTML = value;
		a.setAttribute('href', href);
		a.addEventListener('click', generate.scroll);

		generate.listItem(li, strong, a);
		generate.anchor(href.substr(1));
		generate.monkey();
	};

	const flip = {
		duration: 800,

		chars: [],

		getRotation: (decl) => Number(decl.replace(/[^\d]/g, '')),

		getNext: (angle) => {
			const max = flip.chars.length * 360;
			const idx = (angle % max) / 360;
			const [src, title, position = '0 0'] = flip.chars[idx];

			return {src, title, position, angle};
		},

		reduceParam: (search, param) => {
			const delim = (search.length) ? '&' : '?';
			const [name, val] = param;

			return search + `${delim}${name}=${val}`;
		},

		formatLink: (title) => {
			const BIWRBR = 'butiwouldratherbereading';
			const id = params.get('comic', false);
			const query = [['comic', id], [BIWRBR, title]].
				filter((param) => param[1]).
				reduce(flip.reduceParam, '');

			return document.location.pathname + query;
		},

		link: (title) => {
			const plink = document.querySelector('.clutch a.permalink');
			const href = flip.formatLink(title);

			plink.setAttribute('href', href);
		},

		swap: (img, next) => () => {
			img.setAttribute('src', next.src);
			flip.link(next.title);
		},

		onload: (elem, next) => () => {
			const swap = flip.swap(elem, next);
			const timeout = flip.duration / 2;

			elem.style.transform = `rotateY(${next.angle}deg)`;
			elem.style.backgroundPosition = next.position;
			window.setTimeout(swap, timeout);
		},

		preload: (next, elem) => {
			const img = document.createElement('img');

			img.addEventListener('load', flip.onload(elem, next));
			img.setAttribute('src', next.src);
		},

		flop: (event) => {
			event.preventDefault();

			const elem = event.currentTarget;
			const angle = flip.getRotation(elem.style.transform) + 360;
			const next = flip.getNext(angle);

			flip.preload(next, elem);
		},

		getBackground: (elem) => {
			const decl = elem.style.backgroundImage;
			return (decl) ? decl.replace(/^.+[\('"]+([^\)"']+).+$/, '$1') : '';
		},

		getImages: (elem) => {
			const current = elem.getAttribute('src');
			const bg = flip.getBackground(elem);

			return (bg) ? [bg, current] : [current, current];
		},

		findBaseIndex: (chars, base) => {
			for (let i in chars) {
				if (chars[i][0] === base) { return i; }
			}

			return 0;
		},

		reindex: (chars, inc, mod) => (indexed, _, idx) => (
			indexed.concat([chars[(idx + inc) % mod]])
		),

		rebase: (base) => (chars) => {
			const inc = flip.findBaseIndex(chars, base);
			const len = chars.length;
			const based = chars.reduce(flip.reindex(chars, inc, len), []);

			return based;
		},

		shuffle: (chars) => {
			for (let currIdx = chars.length - 1; currIdx > 0; --currIdx) {
				const randIdx = 1 + Math.floor(Math.random() * currIdx);
				const temp = chars[currIdx];

				chars[currIdx] = chars[randIdx];
				chars[randIdx] = temp;
			}

			return chars;
		},

		initChars: (current, original) => {
			const chain = compose(flip.rebase(current), flip.shuffle);
			const base = [
				[original, ''],
				['lastever.png', 'thelastdinosaurcomicever',],
				['assimilated.png', 'onewheretrexgotassimilated',],
				['frig.png', 'onewheretrexswearsmore',],
				['clothes.png', 'onewheretrexwearsmore',],
				['feathers.png', 'somethingmorehistoricallyaccurate',],
				['xkcd.png', 'xkcd',],
				['penny.png', 'pennyarcade', '7px 8px',],
				['problemsleuth.png', 'problemsleuth',],
			];
			const chars = chain(base);

			return chars;
		},

		initComic: (elem, original) => {
			elem.classList.remove('comic');
			elem.style.transform = 'rotateY(0deg)';
			elem.style.transitionDuration = `${flip.duration}ms`;
			elem.style.backgroundImage = `url(${original})`;
			elem.addEventListener('dblclick', flip.flop);
		},

		init: (elem) => {
			const [original, current] = flip.getImages(elem);

			flip.chars = flip.initChars(current, original);
			flip.initComic(elem, original);
		},
	};

	const nest = {
		emptyCell: () => document.createElement('td'),

		link: () => {
			const a = document.createElement('a');

			a.className = 'permalink';
			a.textContent = '(permalink)';
			a.setAttribute('href', window.location.href);

			return a;
		},

		clutch: () => {
			const ul = document.createElement('ul');

			return ul;
		},

		clutchCell: () => {
			const td = nest.emptyCell();
			td.className = 'clutch';
			td.appendChild(nest.link());
			td.appendChild(nest.clutch());

			return td;
		},

		row: () => {
			const tr = document.createElement('tr');

			tr.appendChild(nest.emptyCell());
			tr.appendChild(nest.clutchCell());
			tr.appendChild(nest.emptyCell());

			return tr;
		},

		build: () => {
			const tbody = document.querySelector('center tbody');
			const row = nest.row();

			tbody.appendChild(row);
		},

		stub: (tagSet) => {
			const [tagName, value] = tagSet;
			const elem = document.createElement(tagName);
			const prop = (tagName === 'div') ? 'innerHTML' : 'textContent';

			elem[prop] = value.toString();

			return elem;
		},

		egg: (elem) => (name) => {
			const oops = () => generate[name]('<em>Friiiiig.</em>');

			Promise.
				resolve(select[name](elem)).
				then(process[name]).
				then(generate[name]).
				catch(oops);
		},

		eggs: (elem) => {
			const eggs = ['Title', 'Contact', 'RSS'];
			const mapFields = nest.egg(elem);

			eggs.map(mapFields);
		},

		init: (elem) => {
			nest.build();
			nest.eggs(elem);
		},
	};

	const init = (comic) => {
		params.init();
		nest.init(comic);
		flip.init(comic);
	};

	const comic = getComicElement();

	return (comic) ? init(comic) : false;
})();
