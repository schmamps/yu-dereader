import * as dom from '../dom';
import { Canon } from '../types/seeding';

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

/**
 * Get canonical comic information
 * @returns Canon object
 * @throws
 */
const getCanon = (): Canon => {
	const [id, src, element] = [
		getId(),
		getSrc(),
		getElement()
	];

	return { id, src, element } as Canon;
}

export { getCanon as get };
