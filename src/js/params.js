const params = {
	// TODO: eliminate defaults
	defaults: ({subject: '', comic: '', [core.BIWRBR]: ''}),

	shim: {
		getItems: (search) => search.split('&'),

		getPairs: (items) => items.map((item) => item.split('=')),

		decode: (pair) => {
			const [name, raw = ''] = pair;

			try {
				return [name, decodeURIComponent(raw)];
			}
			catch (_) {
				return [name, raw];
			}
		},

		tidy: (pairs) => pairs.map(params.shim.decode),

		get: (search) => (Promise.
			resolve(search).
			then(params.shim.getItems).
			then(params.shim.getPairs).
			then(params.shim.tidy)
		),
	},

	getList: (url) => {
		const urlObj = new URL(url);

		if ('searchParams' in urlObj) {
			return Array.from(urlObj.searchParams.entries());
		}

		return params.shim.get(urlObj.search.substr(1));
	},

	reducePair: (obj, pair) => {
		const [name, val = ''] = pair;

		obj[name] = val;

		return obj;
	},

	reduce: (pairs) => {
		const initial = Object.assign({}, params.defaults);

		return pairs.reduce(params.reducePair, initial);
	},

	parse: (url) => (Promise.
		resolve(url).
		then(params.getList).
		then(params.reduce)
	),

	join: {
		filter: (pairs) => pairs.filter((pair) => String(pair[1]).length),

		pairs: (pairs) => pairs.map((pair) => pair.join('=')),

		values: (vals) => vals.join('&'),

		search: (search, path = document.location.pathname) => (
			[path, search].
				filter((str) => str).
				join('?')
		),
	},

	build: (pairs) => (Promise.
		resolve(pairs).
		then(params.join.filter).
		then(params.join.pairs).
		then(params.join.values)
	),
};
