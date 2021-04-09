import * as dom from '../dom';
import { deposit } from './nest';


/**
 * Initialize RSS content anchor
 * @returns anchor name
**/
const createRssAnchor = (): string => {
	const name = 'yu-dereader';
	const anchor = <HTMLAnchorElement>dom.create('a', {name});

	dom.query('#blogpostheader').appendChild(anchor);

	return name;
};

/**
 * Link to RSS content anchor
**/
const createAnchorLink = (html: string, href: string): HTMLAnchorElement => {
	const a = <HTMLAnchorElement>dom.create('a', {html, href});

	return a;
};

/**
 * Display RSS content
 */
const displayRss = (head: string, value: string) => {
	const anchorName = createRssAnchor();
	const content = createAnchorLink(value, `#${anchorName}`)

	deposit(head, content);
};

export {
	displayRss as display,
};
