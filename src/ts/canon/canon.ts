import * as dom from '../dom';

interface Canon {
	id:number,
	src:string,
	element:HTMLImageElement,
};

/**
 * Get canonical path to comic
 * @throws
**/
const getSrc = (): string => {
	const elm = dom.meta('og:image');

	if (!elm) {
		throw new Error('error getting canonical image');
	}

	return elm.content.replace(/^http.+(comics.+)$/, '$1');
};

/**
 * Get canonical URL
 * @throws
**/
const getCanonURL = (): URL => {
	const elm = dom.meta('og:url');

	if (!elm) {
		throw new Error('error getting canonical URL');

	}

	return new URL(elm.content);
};

/**
 * Get comic ID
 * @throws
**/
const getId = (): number => {
	try {
		const url = getCanonURL();

		return Number(url.searchParams.get('comic'));
	}
	catch (e) {
		e.__ = 'error getting canonical ID'

		throw e;
	}

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

	if (found) {
		return <HTMLImageElement>found;
	}

	throw new Error('comic not found');
};

const id = getId();
const src = getSrc();
const element = getElement();

export { Canon, id, src, element };
