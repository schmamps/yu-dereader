(function() {
	'use strict';

	const stub = (tagName, content) => {
		let elm = document.createElement(tagName);
		let prop = (tagName === 'span') ? 'innerHTML' : 'textContent';
		elm[prop] = content.toString();
		return elm.outerHTML;
	};

	const hatch = (name) => (value) => {
		let html = ['<li>', stub('strong', name), stub('span', value), '</li>'];
		document.querySelector('ul.clutch').innerHTML += html.join('\n');
	};

	const nest = (width) => {
		let template = document.createElement('template');
		template.innerHTML =
`<tr><td colspan="3"><ul class="clutch"
style="margin:0 auto;width:${width}px"/></td></tr>
<style type="text/css">ul.clutch strong { padding-right: .5em; }
ul.clutch span { padding-bottom: .5em; }</style>`;

		document.
			querySelector('center tbody').
			appendChild(template.content.children[0]);
	};

	const deposit = (name, getter) => {
		Promise.resolve(getter()).then(hatch(name));
	};

	const subj = {};
	subj.develop = (str) => decodeURIComponent(str.replace(/^.+subject=/, ''));
	subj.seed = () => document.
		querySelector('.topnav a[href^=mailto]').
		getAttribute('href');

	let rss = {};
	rss.develop = (str) => str.replace(/<(\!\-{2}.+?|\/.+?\-{2})>/g, '');
	rss.seed = () => {
		let xPath = '/html/body//comment()[contains(., \'rss-title\')]';
		return document.
			evaluate(xPath, document, null, XPathResult.ANY_TYPE).
			iterateNext().
			data;
	};

	const roost = (comic) => {
		nest(comic.clientWidth);
		deposit('Title', () => comic.getAttribute('title'));
		deposit('Contact', () => subj.develop(subj.seed()));
		deposit('RSS', () => rss.develop(rss.seed()));
	};

	const comic = document.querySelector('img.comic');
	if (comic) { roost(comic); }
})();
