const characters = {
	list: [],

	findBaseIndex: (chars, rather) => {
		let idx = -1;
		let found;
		let max = chars.length;

		do {
			++idx;
			found = (chars[idx].rather === rather);
		} while (idx < max && !found);

		return idx % max;
	},

	reindex: (origin, len) => (newList, char, idx) => {
		const newIdx = (idx + len - origin) % len;

		newList[newIdx] = char;

		return newList;
	},

	getIndexer: (chars, rather) => {
		const base = characters.findBaseIndex(chars, rather);

		return characters.reindex(base, chars.length);
	},

	rebase: (rather) => (chars) => {
		const reindex = characters.getIndexer(chars, rather);

		return chars.reduce(reindex, Array(chars.length));
	},

	shuffle: (all, char, idx) => {
		const randIdx = Math.floor(Math.random() * (idx + 1));

		all[idx] = all[randIdx];
		all[randIdx] = char;

		return all;
	},

	randomize: (chars) => {
		const first = [chars.shift()];
		const shuffled = chars.reduceRight(characters.shuffle, chars);

		characters.list = first.
			concat(shuffled).
			map((char, idx) => Object.assign({idx}, char));

		return characters.list;
	},

	getNext: (currentSrc) => {
		let isCurrent = false;
		let idx = 0;
		let max = characters.list.length;

		while (!isCurrent && idx < max) {
			isCurrent = (currentSrc.endsWith(characters.list[idx].src));
			++idx;
		}

		return characters.list[idx % max];
	},

	init: (altChars, original, rather) => {
		const rebase = characters.rebase(rather);

		return Promise.
			resolve([original].concat(altChars)).
			then(rebase).
			then(characters.randomize);
	},
};
