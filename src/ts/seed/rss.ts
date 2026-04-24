import { NOT_FOUND } from '../consts';
import * as dom from '../dom';

/**
 * find RSS content in comments
 */
const findContent = (): string => {
	const xPath = '//body//comment()[contains(., \'rss-title\')]';
	const node = <CDATASection>dom.eval(xPath);

	return node.data.toString().trim();
};

/**
 * Get RSS title of comic
 */
const getRssTitle = (): Promise<string> => {
	const rssTitle = Promise.resolve(findContent()).catch(() => NOT_FOUND);

	return rssTitle;
}

export { getRssTitle as get };

