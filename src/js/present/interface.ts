import { views } from '.';
import CONSTS from '../consts';
import * as dom from '../dom';


const comic = <HTMLImageElement> dom.query('center tbody tr:first-child img');
const transition = 800;
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
 * Get img src from nominal source
**/
const getSrc = (nomSrc: string): string => {
	if (nomSrc === '') {
		return comic.style.backgroundImage.replace(/^.+\/(.+png).*$/, '$1');
	}

	return nomSrc.
		split('.').
		concat('png').
		slice(0, 2).
		join('.')
	;
};


/**
 * Set view display from `viewSelector.options[index]`
**/
const setViewDisplay = (index: number) => {
	const vwData = viewSelector.options[index].dataset;
	const rotY = Number(comic.style.transform.replace(/\D/g, ''));
	const updateView = () => { comic.src = getSrc(vwData.src); };

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
async function initHistory() {
	const viewOpt = viewSelector.selectedOptions[0];
	const canonUrl = normalizeUrl({[CONSTS.RATHER]: viewOpt.value});

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
async function initComic(canon: string) {
	const delay = transition / 2;
	const transProp = [
		`transform ${transition}ms`,
		`background-position 0ms ease ${delay}ms`
	].join(', ')

	comic.style.backgroundImage = `url(${canon})`
	comic.style.transition = transProp;
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
 * Initialize interface
 * @throws
**/
const initAll = (canon: string, vwSel: HTMLSelectElement) => {
	initComic(canon);

	return Promise.
		resolve(initSelector(vwSel)).
		then(initHistory).
		then(() => Promise.all([
			initFlip(),
			initSelect(),
		])).
		catch((e) => {
			e.__ = 'initializing interface';

			throw e;
		});
};


export {
	initAll as init,
};
