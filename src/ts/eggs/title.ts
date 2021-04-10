import { canon } from '../canon';
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
	const val = canon.element.title ?? NOT_FOUND;

	return {head, val};
}

export {
	get,
	NAME as name,
	KEY as key,
};
