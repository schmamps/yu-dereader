import * as dom from '../dom';

/**
 * Link to RSS content anchor
**/
const createAnchorLink = (innerHTML: string): HTMLAnchorElement => {
	const link = <HTMLAnchorElement>dom.create('a', { innerHTML, class: 'rss' });

	return link;
};

/**
 * Display RSS content
 */
const displayRss = async (rssTitle: string) => {
	const link = createAnchorLink(rssTitle);

	return link;
};

export {
	displayRss as lay
};

