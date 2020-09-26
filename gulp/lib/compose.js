module.exports = (...sources) => {
	let composed = {};

	for (const source of sources) {
		try {
			composed = Object.assign(composed, source);
		}
		catch (e) {
			throw new Error('composition error for value: ' + source.toString());
		}
	}

	return composed;
};
