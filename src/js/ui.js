const flip = {
	flop: () => {
		const next = characters.getNext(comic.element.src);

		comic.flip(next);
	},

	init: () => (dom.
		listen(comic.element).
		on('dblclick', flip.flop)
	),
};

const links = {
	perma: null,

	prev: null,

	next: null,

	getSearch: (comicId, rather) => (Promise.
		resolve([['comic', comicId], [core.BIWRBR, rather]]).
		then(params.build)
	),

	setHref: (elem) => (url) => {
		elem.href = url;

		return url;
	},

	apply: (elem, location, comicId, char) => {
		const path = location.pathname;
		const getURL = (search) => params.join.search(search, path);
		const setHref = links.setHref(elem);

		return links.
			getSearch(comicId, char.rather).
			then(getURL).
			then(setHref);
	},

	main: (elem, char) => {
		const {location} = document;

		return links.apply(elem, location, comic.id, char);
	},

	nav: (elem, query, char) => {
		const location = new URL(elem.href);

		return links.apply(elem, location, query.comic, char);
	},

	setHistory: (char) => (url) => {
		window.history.pushState(char, document.title, url);
	},

	resolve: (resolved) => {
		const [prev, next, char, isHistState, elem = links.perma] = resolved;
		const mainThen = (isHistState) ? () => {} : links.setHistory(char);

		links.nav(links.prev, prev, char);
		links.nav(links.next, next, char);
		links.
			main(links.perma, char).
			then(mainThen);

		return elem;
	},

	update: (char, isHistState = false) => {
		return Promise.
			all([
				params.parse(links.prev.href),
				params.parse(links.next.href),
				char,
				isHistState,
			]).
			then(links.resolve);
	},

	assign: (elem) => {
		links.perma = elem;

		return elem;
	},

	init: () => {
		links.perma = dom.create('a.permalink');
		links.perma.textContent = '(permalink)';
		links.prev = dom.eval('//body/center/table/tbody/tr[1]/td[1]/div/a');
		links.next = dom.eval('//body/center/table/tbody/tr[1]/td[3]/div/a');

		return links.update(characters.list[0]);
	},
};

const dropdown = {
	element: null,

	sortChar: (sorted, char) => {
		sorted[char.sort] = char;

		return sorted;
	},

	appendChild: (parent, child) => {
		parent.append(child);

		return parent;
	},

	option: (char, rather) => {
		const opt = dom.create('option');

		opt.value = char.idx;
		opt.textContent = char.desc;
		opt.dataset.src = char.src;
		opt.selected = (char.rather === rather);

		return opt;
	},

	reduceChars: (rather) => (group, char) => {
		const opt = dropdown.option(char, rather);

		return dropdown.appendChild(group, opt);
	},

	optgroup: (chars, rather) => {
		const group = dom.create('optgroup');
		const reduceChars = dropdown.reduceChars(rather);

		group.label = '...but I would rather be reading:';

		return chars.reduce(reduceChars, group);
	},

	getChildren: (chars, rather) => {
		const len = chars;
		const sorted = chars.reduce(dropdown.sortChar, Array(len));

		return [
			dropdown.option(sorted[0], rather),
			dropdown.optgroup(sorted.slice(1), rather)
		];
	},

	populate: (rather) => (select) => (dropdown.
		getChildren(characters.list, rather).
		reduce(dropdown.appendChild, select)
	),

	getCharacter: (val) => {
		const idx = Number(val);

		return characters.list[idx];
	},

	change: (event) => {
		const char = dropdown.getCharacter(event.target.value);

		event.preventDefault();
		comic.flip(char);
	},

	register: (elem) => {
		dom.listen(elem).on('change', dropdown.change);

		return elem;
	},

	assign: (elem) => {
		dropdown.element = elem;

		return elem;
	},

	update: (charIdx) => {
		for (let opt of dropdown.element.options) {
			if (Number(opt.value) === charIdx) {
				opt.selected = true;
				return;
			}
		}
	},

	init: (rather) => {
		const populate = dropdown.populate(rather);

		return Promise.
			resolve('select').
			then(dom.create).
			then(populate).
			then(dropdown.register).
			then(dropdown.assign);
	},
};

const ui = {
	update: (char, isHistState) => {
		links.update(char, isHistState);
		dropdown.update(char.idx);
	},

	onPop: (event) => {
		if (event.state) {
			comic.flip(event.state, true);
		}
	},

	register: () => {
		comic.onSwap = ui.update;
		window.onpopstate = ui.onPop;
	},

	wrapLinks: (elems) => {
		const div = dom.create('div');
		const wrap = dom.appendTo(div);

		return wrap(elems);
	},

	resolve: (resolved) => {
		const elems = resolved.slice(2);

		return Promise.
			resolve(elems).
			then(ui.wrapLinks).
			then(dom.row.add);
	},

	init: (query) => (Promise.
		all([
			ui.register(),
			flip.init(),
			links.init(),
			dropdown.init(query.rather),
		]).
		then(ui.resolve)
	),
};
