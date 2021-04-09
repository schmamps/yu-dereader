import * as dom from '../dom';
import { EggData } from './types';
import NOT_FOUND from './not_found';


const NAME = 'RSS';
const KEY = 'rss';


/**
 * find RSS content in comments
 */
const findContent = (): string => {
	const xPath = '//body//comment()[contains(., \'rss-title\')]';
	const node = <CDATASection> dom.eval(xPath);

	return node.data.trim();
}

/**
 * Get RSS title of comic
 */
const get = async function getRssCdata(): Promise<EggData> {
	const head = NAME;

	try {
		const val = findContent();

		return {head, val};
	}
	catch (e) {
		return {head, val: NOT_FOUND};
	}
}

export {
	get,
	NAME as name,
	KEY as key,
};
