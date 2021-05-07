import * as dom from '../dom';
import { Seeded } from '../egg';
import { deposit } from './nest';


/**
 * Link to RSS content anchor
**/
const createAnchorLink = (innerHTML:string): HTMLAnchorElement => {
	const a = <HTMLAnchorElement>dom.create('a', {innerHTML, class: 'rss'});

	return a;
};

/**
 * Display RSS content
 */
const displayRss = (seed:Seeded) => {
	const {head, val:rssTitle} = seed;
	const val = createAnchorLink(<string>rssTitle);

	deposit({head, val});

	return val;
};

export {
	displayRss as display,
};
