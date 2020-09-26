module.exports = (opts) => {
	const {in: input = [], sub, out: output = false} = opts;
	const src = [].concat(input).map((file) => `./src/${sub}/${file}`);
	const dest = 'build';
	const desc = (Array.isArray(input)) ? `${input[0]}...` : input;
	const out = (output) ? output : input;

	return Object.assign({}, opts, {src, dest, desc, out});
};
