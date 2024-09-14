completion((() => {
	const get = {
		Title: () => {
			const sel = 'meta[property="og:description"]';
			const attr = 'content';

			try {
				const comic = document.querySelector(sel);

				return comic.getAttribute(attr);
			}
			catch (e) {
				return `[unable to access comic: '${e}']`;
			}
		},
		Contact: () => {
			const sel = ['', 'mobile'].
				map((cls) => `.topnav${cls} a[href^=mailto]`).
				join(', ');
			const attr = 'href';
			const param = 'subject';

			try {
				const mailto = document.querySelector(sel);
				const url = new URL(
					mailto.getAttribute(attr));

				return url.searchParams.get(param);
			}
			catch (e) {
				return `unable to get contact link: ${e}`;
			}
		},
		RSS: () => {
			const xPath = `
//body//comment()[contains(., \'rss-title\')]
`.trim();
			const node = document.
				evaluate(xPath, document, null, 0).iterateNext();

			try {
				// TODO: proper parsing
				return node.textContent.
					replace(/.+?>(.+)<\/.+>/, '$1');
			}
			catch (e) {
				return `[unable to get RSS title: ${e}]`;
			}
		},
	};

	const display = {
		egg: (titleText, contentText) => {
			const title = document.createElement('h2');
			const content = document.createElement('span');
			const wrap = document.createElement('div');
			const cell = document.createElement('td');
			const row = document.createElement('tr');

			title.textContent = titleText;
			title.style.float = 'left';
			title.style.width =
				content.textContent = contentText;

			wrap.appendChild(title);
			wrap.appendChild(content);

			cell.setAttribute('colspan', 3);
			cell.appendChild(wrap);

			row.classList.add('egg');
			row.appendChild(cell);

			document.
				querySelector('center table tbody').
				appendChild(row);
		},
		error: (e) => {
			const msg = `
An error occurred retrieving Dinosaur Comics Easter eggs.
Please be sure that you are visiting <qwantz.com>,
and using 'Request Desktop Website' from the [Aa] menu:

[${e}]
`.trim();

			pre = document.createElement('pre');
			pre.textContent = msg;

			document.body.appendChild(box);
		}
	}

	const reset = () => {
		const style = document.createElement('style');

		style.classList.add('egg');
		style.textContent = `
body header {
	background-color: #f00;
}

.egg td > div {
  width: 750px;
  margin: 0.1rem auto;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted #eee;
}

.egg td > div {
  width: 750px;
  margin: 0.1rem auto;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dotted #eee;
}
.egg td > div div {
  display: flex;
}
.egg h2 {
  float: left;
  width: 20%;
  margin: 0.2rem 0;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: initial;
}
.egg h2 + * {
  display: block;
  max-width: 80%;
  text-align: justify;
}
.egg a {
  color: #000;
  text-decoration: none;
  font-weight: normal;
}
.egg a:hover {
  color: #00b;
  text-decoration: underline;
  background-color: transparent;
}
`

		document.
			querySelectorAll('style.egg, tr.egg').
			forEach(e => e.remove());

		document.body.appendChild(style);
	}

	try {
		reset();

		Array.
			from(Object.keys(get)).
			map((title) => [title, get[title]()]).
			forEach((tcTuple) => display.egg(...tcTuple));

		return;
	}
	catch (e) {
		// display.error(e);

		return e.toString();
	}
})());
