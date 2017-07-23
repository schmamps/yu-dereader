// TODO: Safari CSS

(() => {
	'use strict';

	const getComic = () => {
		const elem = document.querySelector('img.comic');
		return (elem) ? elem : false;
	};

	const select = {
		Title: (comic) => {
			return comic;
		},

		Contact: () => {
			return document.querySelector('.topnav a[href^=mailto]');
		},

		RSS: () => {
			const xPath = '//body//comment()[contains(., \'rss-title\')]';

			return document.evaluate(xPath, document, null, 0).iterateNext();
		},

		Message: () => {
			return Array.
				from(document.querySelectorAll('#blogpost .rss-content')).
				filter((elem) => elem.textContent.length > 0).
				pop();
		},
	};

	const process = {
		Title: (elem) => {
			return elem.getAttribute('title');
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

		Message: (elem) => elem.innerHTML,
	};

	const flip = {
		duration: 1000,

		getBackground: (comic) => {
			const decl = comic.style.backgroundImage;
			const re = /^.+['"](.+)['"].*$/;
			const url = decl.replace(re, '$1');

			return url;
		},

		setBackground: (comic) => (next) => {
			const prev = flip.getBackground(comic);

			comic.style.backgroundImage = `url('${next}')`;

			return prev;
		},

		setImageSrc: (comic) => (src) => comic.setAttribute('src', src),

		swap: (comic) => () => {
			Promise.
				resolve(comic.getAttribute('src')).
				then(flip.setBackground(comic)).
				then(flip.setImageSrc(comic));
		},

		flop: (comic) => () => {
			comic.style.transitionDuration = flip.duration + 'ms';
			comic.classList.toggle('lastEver');
			window.setTimeout(flip.swap(comic), flip.duration * .5);
		},

		init: (comic) => {
			const setBackground = flip.setBackground(comic);

			setBackground('lastever.png');
			comic.addEventListener('dblclick', flip.flop(comic));
		},
	};

	const render = {
		nest: () => {
			const tbody = document.querySelector('center tbody');
			const tr = document.createElement('tr');

			tr.innerHTML = '<td/><td><ul class="clutch"/><td/>';

			tbody.appendChild(tr);
		},

		stub: (tagSet) => {
			const [tagName, value] = tagSet;
			const elem = document.createElement(tagName);
			const prop = (tagName === 'div') ? 'innerHTML' : 'textContent';

			elem[prop] = value.toString();

			return elem;
		},

		egg: (name) => (value) => {
			const tagSets = [['strong', name], ['div', value]];
			const li = document.createElement('li');
			const clutch = document.querySelector('ul.clutch');

			tagSets.map(render.stub).map((elem) => li.appendChild(elem));
			clutch.appendChild(li);
		},

		field: (comic) => (name) => {
			const seed = select[name];
			const develop = process[name];
			const hatch = render.egg(name);
			const oops = () => hatch('<em>dud!</em>');

			Promise.resolve(seed(comic)).then(develop).then(hatch).catch(oops);
		},

		eggs: (comic) => {
			const fields = ['Title', 'Contact', 'RSS', 'Message'];
			const mapFields = render.field(comic);

			fields.map(mapFields);
		},

		init: (comic) => {
			render.nest();
			render.eggs(comic);
			flip.init(comic);
		},
	};

	const comic = getComic();

	return (comic) ? render.init(comic) : false;
})();
