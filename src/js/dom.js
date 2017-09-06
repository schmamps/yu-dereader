const dom = {
	query: (selector) => document.querySelector(selector),

	evalAll: (xPath) => (document.
		evaluate(xPath, document, null, 0)
	),

	eval: (xPath) => dom.evalAll(xPath).iterateNext(),

	selector: {
		split: (selector) => `!${selector}`.split(/(?=[\.#])/),

		reduce: (data, comp) => {
			const [key, val] = [comp.charAt(0), comp.substr(1)];

			data[key].push(val);

			return data;
		},

		short: (comps) => {
			const base = {'!': [], '#': [], '.': []};

			return comps.reduce(dom.selector.reduce, base);
		},

		attr: {
			filter: (pair) => pair[1].length > 0,

			join: (pair) => [pair[0], pair[1].join(' ')],

			extract: (short) => {
				const {'#': id, '.': classList} = short;

				return [['id', id], ['class', classList]].
					filter(dom.selector.attr.filter).
					map(dom.selector.attr.join);
			},
		},

		expand: (short) => ({
			name: (short['!'].length) ? short['!'][0] : 'template',
			attrs: dom.selector.attr.extract(short),
		}),

		applyAttrPair: (elem, pair) => {
			elem.setAttribute(pair[0], pair[1]);

			return elem;
		},

		apply: (expanded) => expanded.attrs.reduce(
			dom.selector.applyAttrPair,
			document.createElement(expanded.name)
		),

		step: (parsed, step) => step(parsed),

		parse: (selector) => {
			const steps = [
				dom.selector.split,
				dom.selector.short,
				dom.selector.expand,
				dom.selector.apply
			];

			return steps.reduce(dom.selector.step, selector);
		}
	},

	create: (...selectors) => {
		const elems = [].concat(selectors).map(dom.selector.parse);

		return (selectors.length === 1) ? elems[0] : elems;
	},

	appendTo: (parent) => (children) => {
		[].concat(children).map((child) => parent.appendChild(child));

		return parent;
	},

	listen: (elem) => ({
		on: (eventName, handler) => elem.addEventListener(eventName, handler)
	}),

	row: {
		cell: (content) => {
			const td = dom.create('td');

			td.setAttribute('colspan', 3);
			td.appendChild(content);

			return td;
		},

		create: (td) => {
			const tr = dom.create('tr.egg');

			tr.appendChild(td);

			return tr;
		},

		append: (row) => {
			const parent = dom.query('center tbody');
			const append = dom.appendTo(parent);

			append(row);

			return row;
		},

		add: (content) => {
			Promise.
				resolve(content).
				then(dom.row.cell).
				then(dom.row.create).
				then(dom.row.append);
		},
	},
};
