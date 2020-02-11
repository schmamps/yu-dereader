const init = {
	config: () => {
		return Promise.all([
			comic.init(),
			config.alts(),
			config.eggs()
		]);
	},

	basic: (resolved) => {
		const [comicPath, altChars, eggs] = resolved;

		return Promise.all([
			altChars,
			config.characters.create(comicPath),
			request.init(altChars),
			nest.init(eggs),
		]);
	},

	characters: (resolved) => {
		const [altChars, original, query] = resolved;

		return Promise.all([
			query,
			characters.init(altChars, original, query.rather)
		]);
	},

	interface: (resolved) => {
		return ui.init(resolved[0]);
	},

	onError: (e) => {
		console.group('Angola Maldives: Exception');
		console.log(e);
		console.groupEnd();
	},

	all: () => {
		return init.
			config().
			then(init.basic).
			then(init.characters).
			then(init.interface).
			catch(init.onError)
		;
	}
};

init.all();
