import * as dom from '../dom';


/**
 * Get canonical path to comic
 * @throws
**/
const getCanon = (): string => {
	const elm = dom.meta('og:image');

	if (!elm) {
		throw new Error('canon image not found');
	}

	return elm.content;
};


/**
 * Get canonical comic element
 * @throws
 */
const getElement = (): HTMLImageElement => {
	const found = dom.query([
		'body',
		'center tbody',
		'tr:nth-child(1)',
		'td:nth-child(2) img:last-child'
	].join(' > '));

	if (found) { return <HTMLImageElement> found; }

	throw new Error('comic not found');
};


export {
	getCanon as canon,
	getElement as element,
};
