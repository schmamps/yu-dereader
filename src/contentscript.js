(function() {
	'use strict';
	const elm = {
		get: (selector) => document.querySelector(selector),
		new: (tagName) => document.createElement(tagName),
	};

	const yolk = name => {
		let strong = elm.new('strong');
		strong.style.paddingRight = '.5em';
		strong.textContent = name;
		return strong;
	};

	const zygote = value => {
		let span = elm.new('span');
		span.style.paddingBottom = '.5em';
		span.innerHTML = value.toString();
		return span;
	};

	const egg = (name, value) => {
		let li = elm.new('li');
		li.appendChild(yolk(name));
		li.appendChild(zygote(value));
		return li;
	};

	const hatch = (name) => function(value) {
		elm.get('ul.clutch').appendChild(egg(name, value));
	};

	const clutch = (width) => {
		let ul = elm.new('ul');
		ul.className = 'clutch';
		ul.style.width = width + 'px';
		ul.style.margin = 'auto';
		ul.style.padding = 0;

		let td = elm.new('td');
		td.appendChild(ul);
		return td;
	};

	const nest = (width) => {
		let tr = elm.new('tr');
		tr.appendChild(elm.new('td'));
		tr.appendChild(clutch(width));
		tr.appendChild(elm.new('td'));
		elm.get('center tbody').appendChild(tr);
	};

	function Field(name) {
		this.name = name;
		this.then = hatch(this.name);
	}

	const title = (comic) => {
		let field = new Field('Title');
		field.resolve = () => comic.getAttribute('title');
		return field;
	};

	const contact = () => {
		const field = new Field('Contact');
		field.resolve = () => {
			let href = elm.get('.topnav a[href^=mailto]').getAttribute('href');
			let subject = href.replace(/^.+subject=/, '');
			return decodeURIComponent(subject);
		};

		return field;
	};

	const rss = () => {
		let field = new Field('RSS');
		let xPath = '/html/body//comment()[contains(., \'rss-title\')]';
		let xType = XPathResult.ANY_TYPE;
		field.resolve = () => document.
			evaluate(xPath, document, null, xType).
			iterateNext().
			data.
			replace(/<(\!\-{2}.+?|\/.+?\-{2})>/g, '');

		return field;
	};

	const onReady = () => {
		if (document.readyState !== 'complete') { return; }

		let comic = elm.get('img.comic');

		nest(comic.clientWidth);
		[title(comic), contact(), rss()].map(function(field) {
			Promise.resolve(field.resolve()).then(field.then);
		});
	};

	document.addEventListener('readystatechange', onReady);
})();