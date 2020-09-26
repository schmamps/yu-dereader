import { views } from '.';
import CONSTS from '../consts';
import * as dom from '../dom';
import { Canon } from '../comic/canon';



const transition = 800;
let comic: HTMLImageElement;
let viewSelector: HTMLSelectElement;


/**
 * Get normalized URL
**/
const normalizeUrl = (update = {}): URL => {
	const ID = 'comic';
	const url = new URL(window.location.href.replace(/\?.*$/, ''));
	const {searchParams} = new URL(window.location.href);

	for (const key of [ID, CONSTS.RATHER]) {
		const val = update[key] ?? searchParams.get(key);

		if (val) {
			url.searchParams.set(key, val);
		}
	}

	if (url.pathname.length < 2) {
		url.pathname = '/index.php';
	}

	return url;
}


/**
 * Initialize selector
**/
async function initSelector(vwSel: HTMLSelectElement) {
	const nomView = normalizeUrl().searchParams.get(CONSTS.RATHER) ?? '';

	viewSelector = vwSel;

	for (const view of Array.from(viewSelector.options)) {
		if (view.value !== nomView) { continue; }

		viewSelector.selectedIndex = view.index;

		return;
	}
};

/**
 * Set view display from `viewSelector.options[index]`
**/
const setViewDisplay = (index: number) => {
	const vwData = viewSelector.options[index].dataset;
	const rotY = Number(comic.style.transform.replace(/\D/g, ''));
	const updateView = () => { comic.src = vwData.src; };

	comic.style.transform = `rotateY(${((rotY + 360) % 720)}deg)`;
	comic.style.backgroundPosition = vwData.position;
	window.setTimeout(updateView, transition / 2);
};


/**
 * Update on history popState
**/
const updateState = (event: PopStateEvent) => {
	viewSelector.selectedIndex = event.state;
	setViewDisplay(event.state);
};


/**
 * Init window history with canonical URL and state
**/
async function initHistory(comic: number) {
	const viewOpt = viewSelector.selectedOptions[0];
	const canonUrl = normalizeUrl({
		[CONSTS.RATHER]: viewOpt.value,
		comic
	});

	window.history.replaceState(
		viewOpt.index,
		document.title,
		canonUrl.toString()
	);

	dom.
		listen(window).
		on('popstate', updateState)
	;
}

/**
 * Initialize comic CSS
 */
async function initComic(element: HTMLImageElement, canon: string) {
	comic = element;

	const delay = transition / 2;
	const transProp = [
		`transform ${transition}ms`,
		`background-position 0ms ease ${delay}ms`
	].join(', ')

	comic.style.backgroundImage = `url(${canon})`
	comic.style.transition = transProp;
	comic.dataset.canon = canon;
}


/**
 * Set view state
**/
const setState = (index: number) => {
	const opt = viewSelector.options[index];
	const url = normalizeUrl({[CONSTS.RATHER]: opt.value});

	setViewDisplay(opt.index);
	window.history.pushState(opt.index, document.title, url.toString());
};


/**
 * Handle image flip event
**/
const onFlip = (e: Event) => {
	e.preventDefault();

	let index;

	do {
		index = Math.floor(Math.random() * viewSelector.options.length);
	} while (index === viewSelector.selectedIndex);

	setState(index);
	viewSelector.selectedIndex = index;
};


/**
 * Initialize view flip
 */
async function initFlip() {
	comic.setAttribute('title', 'DOUBLE CLICK FOR MORE AWESOME FUN TIMES!');
	dom.
		listen(comic).
		on('dblclick', onFlip)
	;
}

/**
 * Handle view selector change
**/
const onSelectChange = (e: Event) => {
	e.preventDefault();

	setState(viewSelector.selectedIndex)
};


/**
 * Initialize view selection event
 */
async function initSelect() {
	dom.
		listen(viewSelector).
		on('change', onSelectChange)
	;
}

/**
 * Preload alternate views
 */
async function initPreload() {
	const rel = 'prefetch';

	for (let i = 1; i < viewSelector.options.length; i++) {
		const href = viewSelector.options[i].dataset.src;

		document.head.appendChild(dom.create('link', {rel, href}));
	}
}


/**
 * Scroll to RSS content
**/
const readRSS = (e: Event) => {
	e.preventDefault();

	window.scroll({
		left: window.scrollX,
		top: dom.query(`a[name=${CONSTS.ANCHOR}]`).getBoundingClientRect().y,
		behavior: 'smooth',
	});
};


/**
 * Initialize RSS link & scrolling
 */
async function initRSS() {
	dom.
		query('#blogpostheader').
		appendChild(dom.create('a', {name: CONSTS.ANCHOR}));

	const anchor = dom.query('a.rss');
	anchor.setAttribute('href', `#${CONSTS.ANCHOR}`)
	anchor.addEventListener('click', readRSS);
}


/**
 * Initialize interface
 * @throws
**/
const initAll = (
	comicElm: HTMLImageElement,
	canon: Canon,
	vwSel: HTMLSelectElement
) => {
	initComic(comicElm, canon.src);

	return Promise.
		resolve(vwSel).
		then(initSelector).
		then(() => initHistory(canon.id)).
		then(() => Promise.all([
			initFlip(),
			initSelect(),
			initPreload(),
			initRSS(),
		])).
		catch((e) => {
			e.__ = 'initializing interface';

			throw e;
		});
};


export {
	initAll as init,
};
