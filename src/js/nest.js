const nest = {
	dud: () => '<em>Friiiiig.</em>',

	egg: async (egg) => {
		return Promise.
			resolve(egg.select()).
			then(egg.develop).
			catch(nest.dud).
			then(egg.hatch)
		;
	},

	lay: async (comps) =>  {
		const shell = dom.create('div');
		const append = dom.appendTo(shell);

		await Promise.
			resolve(comps).
			then(append).
			then(dom.row.add);
	},

	deposit: (eggs) => eggs.map(nest.lay),

	init: (eggs) => {
		const clutch = eggs.map(nest.egg);

		return Promise.
			all(clutch).
			then(nest.deposit);
	},
};
