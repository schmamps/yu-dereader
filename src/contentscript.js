(() => {
	'use strict';

	const last = {
		setBG: (comic, url) => {
			comic.style.backgroundImage = `url('${url}')`;
		},

		getBG: (comic) => {
			const decl = comic.style.backgroundImage;
			const url = decl.replace(/^.+(['"])(.+)\1.+$/, '$2');

			return url;
		},

		toggle: (comic) => () => {
			const src = last.getBG(comic);

			last.setBG(comic, comic.getAttribute('src'));
			comic.setAttribute('src', src);
		},

		init: (comic) => {
			comic.style.backgroundRepeat = 'no-repeat';
			comic.style.backgroundPosition = '0 0';
			comic.addEventListener('dblclick', last.toggle(comic));
			last.setBG(comic, '/lastever.png');
		},
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

	const filter = {
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

		RSS: (elem) => {
			return elem.data;
		},

		Message: (elem) => {
			return elem.innerHTML;
		},
	};

	const render = {
		nest: (width) => {  // eslint-disable-line no-unused-vars
			const template = document.createElement('template');
			const tbody = document.querySelector('center tbody');

			template.innerHTML = `
<tr>
	<td colspan="3">
		<ul class="clutch"/>
	</td>
</tr>
<style>
ul.clutch { margin:0 auto; max-width:735px; }
ul.clutch li { padding-bottom: .25em; }
ul.clutch strong { display:block; }
ul.clutch div { margin-left: 2em; }
</style>
`;
			// tbody.appendChild(template.content.children[0]);
			Array.from(template.content.children).map((child) => {
				tbody.appendChild(child);
			});
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
			const develop = filter[name];
			const hatch = render.egg(name);

			Promise.
				resolve(seed(comic)).
				then(develop).
				then(hatch).
				catch(() => hatch('<em>dud!</em>'));
		},

		eggs: (comic) => {
			const fields = ['Title', 'Contact', 'RSS', 'Message'];
			const mapFields = render.field(comic);

			render.nest();
			fields.map(mapFields);
			last.init(comic);
		}
	};

	const init = () => {
		const comic = document.querySelector('img.comic');

		return (comic) ? render.eggs(comic) : false;
	};

	init();
})();
