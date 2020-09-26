module.exports = (...args) => {
	let composed = {};

	for (const arg of args) {
		try {
			Object.assign(composed, arg);
		}
		catch (e) {
			throw new Error('composition error for value: ' + arg.toString());
		}
	}

	return composed;
};
