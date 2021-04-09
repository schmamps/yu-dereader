import * as comic from '../comic';
import * as dom from '../dom';
import { deposit } from './nest';
import { ComicView, ComicViewList } from '../eggs/views';


let viewSelector: HTMLSelectElement;
const RATHER = 'butiwouldratherbereading';
const TRANS_DURATION = 800;

/**
 * Get full path to nominal source (`nomSrc`)
 */
const getPath = (nomSrc: string): string => {
	return nomSrc.includes('.') ? nomSrc : `${nomSrc}.png`;
}

/**
 * Get individual view option
**/
const getOption = (view: ComicView, selected: String): HTMLOptionElement => {
	const option = <HTMLOptionElement>dom.create('option', {text: view.title});

	option.value = view.param ?? '';
	option.selected = (option.value == selected);
	option.dataset.position = view.position ?? '0 0'
	option.dataset.src = (view.src) ? getPath(view.src) : comic.canon.src;

	return option;
};

/**
 * Get group of view options
**/
const getGroup = (
	views: ComicViewList,
	key: string,
	selected: string
):HTMLOptGroupElement => {
	const group = <HTMLOptGroupElement>dom.create('optgroup', {label: key});

	for (const view of views.get(key)) {
		const option = getOption(view, selected);

		group.appendChild(option);
	}

	return group;
};

/**
 * Get view dropdown
**/
const getInput = (views: ComicViewList):HTMLSelectElement => {
	const input = <HTMLSelectElement>dom.create('select');
	const sel = new URL(window.location.href).searchParams.get(RATHER) ?? ''

	for (const key of Array.from(views.keys())) {
		const group = getGroup(views, key, sel);

		input.appendChild(group);
	}

	return input;
};

/**
 * Get canonical URL
**/
const canonizeURL = (update = {}): URL => {
	const ID = 'comic';
	const url = new URL(window.location.href);
	const { searchParams: initial } = new URL(window.location.href);

	url.pathname = 'index.php';
	url.search = ''

	for (const key of [ID, RATHER]) {
		const val = update[key] ?? initial.get(key) ?? false;

		if (val) {
			url.searchParams.set(key, val);
		}
	}

	return url;
}

/**
 * Set view display from `viewSelector.options[index]`
**/
const setViewDisplay = (index: number) => {
	const {dataset} = viewSelector.options[index];
	const rotY = Number(comic.element.style.transform.replace(/\D/g, ''));
	const updateView = () => { comic.element.src = dataset.src; };

	comic.element.style.transform = `rotateY(${((rotY + 360) % 720)}deg)`;
	comic.element.style.backgroundPosition = dataset.position;
	window.setTimeout(updateView, TRANS_DURATION / 2);
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
	const canonUrl = canonizeURL({
		[RATHER]: viewOpt.value,
		comic: comic.canon.id,
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
 * Set state for selected view
**/
const setState = (index: number) => {
	const opt = viewSelector.options[index];
	const url = canonizeURL({[RATHER]: opt.value});

	setViewDisplay(opt.index);
	window.history.pushState(opt.index, document.title, url.toString());
};

/**
 * Handle view change event
 * @returns {}
**/
const onViewChange = (e: Event):void => {
	e.preventDefault();

	setState((<HTMLSelectElement>e.target).selectedIndex);
};

/**
 * Handle image flip event
 */
const onFlip = (e: Event) => {
	e.preventDefault();

	let index: number;

	do {
		index = Math.floor(Math.random() * viewSelector.options.length);
	} while (index === viewSelector.selectedIndex);

	setState(index);
	viewSelector.selectedIndex = index;
};

/**
 * Initialize comic CSS
 */
async function initComic() {
	const delay = TRANS_DURATION / 2;
	const transProp = [
		`transform ${TRANS_DURATION}ms`,
		`background-position 0ms ease ${delay}ms`
	].join(', ')

	comic.element.style.backgroundImage = `url(${comic.canon.src})`
	comic.element.style.transition = transProp;
	comic.element.setAttribute(
		'title',
		'DOUBLE CLICK FOR MORE AWESOME FUN TIMES!'
	);
}

async function initFlip() {
	dom.listen(comic.element).on('dblclick', onFlip);
}


/**
 * Create preloading element
**/
const createPreloader = (href: string):HTMLLinkElement => {
	const rel = 'prefetch';

	return <HTMLLinkElement>dom.create('link', {rel, href});
};


/**
 * Insert preloader
**/
const preload = (href: string):void => {
	const preloader = createPreloader(href);

	document.head.appendChild(preloader);
};

/**
 * Add preloading <link> elements
 */
async function initPreload(options: HTMLOptionsCollection) {
	Array.
		from(options).
		slice(1).
		map((opt: HTMLOptionElement) => opt.dataset.src).
		forEach(preload);
}

/**
 * Display all view options
 */
const displayViews = (head: string, views: any) => {
	viewSelector = getInput(views);
	viewSelector.addEventListener('change', onViewChange);

	const content = dom.create('label');
	const labelText = dom.create('span', {text: 'select a view'});

	content.appendChild(labelText);
	content.appendChild(viewSelector);

	initComic();
	initFlip();
	initHistory();
	initPreload(viewSelector.options);
	deposit(head, content);
};

export {
	displayViews as display,
};
