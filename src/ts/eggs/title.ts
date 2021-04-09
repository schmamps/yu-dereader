import * as comic from '../comic';
import { EggData } from './types';
import NOT_FOUND from './not_found';

const NAME = 'Title';
const KEY = 'title';

/**
 * Get comic title
 * @param {HTMLImageElement} comicElm - source element of comic
 */
const get = async function getTitleAttr(): Promise<EggData> {
	const head = NAME;
	const val = comic.element.title ?? NOT_FOUND;

	return {head, val};
}

export {
	get,
	NAME as name,
	KEY as key,
};
