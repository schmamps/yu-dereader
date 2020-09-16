import * as dom from '../dom';


/**
 * Get comic title
 * @param {HTMLImageElement} comicElm - source element of comic
 * @throws
 */
const findTitle = (comicElm): string => {
	const {title} = comicElm;

	if (title) {
		return title;
	}

	throw new Error('comic title not found');
};


/**
 * Get contact link URL params
**/
const getSubject = (): string | undefined => {
	const href = dom.query('.topnav a[href^=mailto]').getAttribute('href');

	return new URL(href).searchParams.get('subject');
};


/**
 * Get subject in contact link
 * @throws
 */
const findContact = (): string => {
	const subject = getSubject() ?? false;

	if (subject !== false) {
		return subject;
	}

	throw new Error('Contact subject not found');
};


/**
 * Get RSS title of comic
 * @throws
 */
const findRSS = (): string => {
	try {
		const xPath = '//body//comment()[contains(., \'rss-title\')]';
		const node = <CDATASection> dom.eval(xPath);

		return node.data.trim();
	}
	catch (e) {
		e.__ = 'RSS title not found';

		throw e;
	}
};


export {
	findContact as Contact,
	findTitle as Title,
	findRSS as RSS
};
