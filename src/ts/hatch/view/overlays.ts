import { Canon } from '../../canon';
import { RATHER, TRANS_DURATION } from '../../consts';
import * as dom from '../../dom';
import * as urls from './urls';


/**
 * Get current (effective) overlay
**/
const getEffectiveOverlay = (
	validOverlays:string[],
	spec:string
):string => {
	if (validOverlays.includes(spec)) {
		return spec;
	}

	return '';
};

/**
 * Update comic with new overlay
**/
const updateComic = (
	comic:HTMLImageElement,
	src:string,
	pos:string
):any => {
	const rotY = Number(comic.style.transform.replace(/\D/g, ''));
	const setImage = () => { comic.src = src; };

	window.setTimeout(setImage, TRANS_DURATION / 2);

	comic.style.transform = `rotateY(${((rotY + 360) % 720)}deg)`;
	comic.style.backgroundPosition = pos;
};

/**
 * Set new state based on overlay selector
**/
const pushState = (
	comic:HTMLImageElement,
	target:HTMLSelectElement
) => {
	const update = {[RATHER]: target.selectedOptions[0].value};
	const {src, position} = target.selectedOptions[0].dataset;

	for (const arrow of ['left', 'right']) {
		try {
			const selector = `td[align=${arrow}] .nohover a`;
			const a = <HTMLAnchorElement>dom.query(selector);

			a.href = urls.update(update, a.href);
		}
		catch (_) {
			const prob = (arrow === 'left') ? ' not' : ''
			console.info(`Error updating ${arrow} arrow link.
This is (probably${prob}) fine!`);
		}
	}

	window.history.pushState(
		update[RATHER],
		document.title,
		urls.update(update));

	updateComic(comic, src, position);
};

/**
 * Handle overlay change
**/
const setState = (
	comic:HTMLImageElement
) => (
	arg:InputEvent
) => {
	const target = <HTMLSelectElement>arg.currentTarget

	pushState(comic, target);
};

/**
 * Pick random new state
**/
const pickState = (
	overCtl:HTMLSelectElement,
	comic:HTMLImageElement
) => (
	_:MouseEvent
) => {
	const optCount = overCtl.options.length;
	let newIdx = overCtl.selectedIndex;

	while (newIdx === overCtl.selectedIndex) {
		newIdx = Math.floor(Math.random() * optCount);
	}

	overCtl.selectedIndex = newIdx;

	pushState(comic, overCtl);
};

/**
 * Get option matching `val`
 */
const getOption = (
	overCtl:HTMLSelectElement,
	val:string
) => {
	const idx = Math.max(0, dom.values(overCtl).indexOf(val.toString()));

	overCtl.selectedIndex = idx;

	return overCtl.selectedOptions[0];
};

/**
 * Handle history popstate
**/
const popState = (
	overCtl:HTMLSelectElement,
	comic:HTMLImageElement,
) => (
	e:PopStateEvent
) => {
	const {src, position} = getOption(overCtl, e.state.toString()).dataset;

	updateComic(comic, src, position);
};

async function initComic(
	images:string[],
	comic:HTMLImageElement,
	src:string,
) {
	const rel = 'prefetch';

	for (const href of images) {
		const link = dom.create('link', {rel, href});

		document.head.appendChild(link);
	}

	comic.style.backgroundImage = `url(${src})`
	comic.style.transition = [
		`transform ${TRANS_DURATION}ms`,
		`background-position 0ms ease ${TRANS_DURATION / 2}ms`
	].join(', ');
}

/**
 * Extract src from option datasets
**/
const listImages = (overCtl:HTMLSelectElement):string[] => {
	return Array.
		from(overCtl.options).
		slice(1).
		map((opt) => <string>opt.dataset.src);
};

/**
 * Initialize overlay interactivity
**/
const hatchOverlays = (
	canon:Canon,
	overCtl:HTMLSelectElement
):any => {
	const overlay = getEffectiveOverlay(
		dom.values(overCtl),
		urls.current().searchParams.get(RATHER));
	const permalink = urls.update({comic: canon.id, [RATHER]: overlay});

	getOption(overCtl, overlay);
	initComic(listImages(overCtl), canon.element, canon.src);

	window.history.replaceState(overlay, document.title, permalink);

	dom.listen(overCtl).on('change', setState(canon.element));
	dom.listen(window).on('popstate', popState(overCtl, canon.element));
	dom.listen(canon.element).on('dblclick', pickState(overCtl, canon.element));
};

export {
	hatchOverlays as hatch,
};
