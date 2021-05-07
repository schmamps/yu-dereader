import { NOT_FOUND } from '../consts';
import * as dom from '../dom';
import * as egg from '../egg';


/**
 * find RSS content in comments
 */
const findContent = ():string => {
	const xPath = '//body//comment()[contains(., \'rss-title\')]';
	const node = <CDATASection> dom.eval(xPath);

	return node.data.toString().trim();
}

/**
 * Get RSS title of comic
 */
const getRssTitle:egg.Seeder = () => {
	const head = 'RSS';

	return Promise.
		resolve(findContent()).
		then((val) => ({head, val})).
		catch(() => ({head, val: NOT_FOUND}));
}

export {
	getRssTitle as get,
};
