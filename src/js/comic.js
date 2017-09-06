const comic = {
	transitionDuration: 800,

	flips: 0,

	element: null,

	onSwap: () => {},

	getElement: (node) => {
		if (node) { return node; }

		throw new Error('comic not found');
	},

	getBackgroundImage: (elem) => {
		const decl = elem.style.backgroundImage;

		return decl.replace(/^.+\(['"]*([^\)"']+).+$/, '$1');
	},

	getOriginal: (elem) => {
		return [comic.getBackgroundImage(elem), elem.src].
			filter((path) => path).
			shift();
	},

	swap: (char, isHistState) => () => {
		comic.element.src = char.src;

		comic.onSwap(char, isHistState);
	},

	flip: (char, isHistState = false) => {
		const swap = comic.swap(char, isHistState);
		const delay = comic.transitionDuration / 2;

		++comic.flips;
		comic.element.style.transform = `rotateY(${comic.flips * 360}deg)`;
		comic.element.style.backgroundPosition = char.pos;
		window.setTimeout(swap, delay);
	},

	setProperties: (elem) => {
		const path = comic.getOriginal(elem);

		comic.element = elem;
		elem.classList.remove('comic');
		elem.style.transitionDuration = `${comic.transitionDuration}ms`;
		elem.style.backgroundImage = `url(${path})`;

		return path;
	},

	init: () => (Promise.
		resolve('//body/center/table/tbody/tr[1]/td[2]/img').
		then(dom.eval).
		then(comic.getElement).
		then(comic.setProperties)
	),
};
