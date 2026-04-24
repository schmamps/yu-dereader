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
const getCanonURL = async (): Promise<URL> => {
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
const getId = async (): Promise<number> => {
	try {
		const url = await getCanonURL();

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
const getElement = async (): Promise<HTMLImageElement> => {
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
 */
const getCanon = (): Canon => {
	Promise.all([
		getId(),
		getSrc(),
		getElement(),
	]).then(([id, src, element]) => {
		const canon: Canon = { id, src, element };

		return canon;
	});

	return {} as Canon;
}

export { getCanon as get };
