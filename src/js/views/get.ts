import * as dom from '../dom';


/**
 * Get canonical view
 */
async function getCanon(): Promise<URL> {
	const elm = dom.meta('og:url');

	return new URL(elm.content);
}


/**
 * Get current view
 */
async function getCurrent(): Promise<URL> {
	return new URL(document.location.href);
};


export const get = getCanon;
export const current = getCurrent;
