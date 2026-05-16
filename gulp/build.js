const init = (explicit) => {
	return {
		run: () => {
			return Promise.all(
				Object.keys(explicit).map((taskName) => explicit[taskName].run())
			);
		},
		desc: async () => { return 'build'; },
		abstract: {}
	};
}

export {
	init,
};
