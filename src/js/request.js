const request = {
	rather: (spec, alts) => (alts.
		filter((alt) => alt.rather === spec).
		map((alt) => alt.rather).
		concat('').
		shift()
	),

	refine: (altChars) => (sources) => {
		const [input, canon] = sources;
		const query = Object.assign({}, input, {canon: canon.comic});

		query.rather = request.rather(query[core.BIWRBR], altChars);
		comic.id = query.comic;

		return query;
	},

	input: () => params.parse(document.location.href),

	canon: () => (Promise.
		resolve('meta[property="og:url"]').
		then(dom.query).
		then((elem) => elem.content).
		then(params.parse)
	),

	init: (altChars) => {
		const refine = request.refine(altChars);

		return Promise.
			all([request.input(), request.canon()]).
			then(refine);
	},
};
