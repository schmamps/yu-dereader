import * as dom from '../dom';

/**
 * Initialize RSS content anchor
**/
const createPostAnchor = (name: string) => {
	const anchor = <HTMLAnchorElement>dom.create('a', { name });
	const header = dom.query('#blogpostheader');

	if (header) header.appendChild(anchor);
};

/**
 * Pad container height
**/
const padContainer = () => {
	const cont = dom.query('div#container') ?? false;
	if (cont === false) return;

	const footHt = cont?.nextElementSibling?.getBoundingClientRect().height ?? false;
	if (footHt === false) return;

	const fullHt = dom.query('html')?.getBoundingClientRect().height ?? false;
	if (fullHt === false) return;

	const mHt = Math.max(
		cont?.getBoundingClientRect().height ?? 0,
		fullHt - footHt
	);

	cont.style.minHeight = `${mHt}px`;
};

/**
 * Get blogpost anchor element
**/
const getBlogAnchor = (hash: string) => {
	const name = hash.substring(1)

	return <HTMLAnchorElement>dom.query(`a[name=${name}]`);
};

/**
 * Get top of blogpost header
**/
const getBlogTop = (hash: string): number => {
	const anchor = getBlogAnchor(hash);

	return anchor.getBoundingClientRect().top;
};

/**
 * Handle RSS link click
**/
const onClick = (e: Event) => {
	e.preventDefault();

	const fudge = window.scrollY - 6;
	const top = fudge + getBlogTop((<HTMLAnchorElement>e.currentTarget).hash);
	const behavior = 'smooth';

	window.scroll({ top, behavior });
};

/**
 * Make RSS link interactive
 */
const hatchRSS = async (link: HTMLAnchorElement) => {
	const ANCHORNAME = 'yu-dereader';

	padContainer();
	createPostAnchor(ANCHORNAME);
	link.setAttribute('href', `#${ANCHORNAME}`);
	dom.listen(link).on('click', onClick);

	dom.deposit('RSS', link);
};

export {
	hatchRSS as hatch
};

