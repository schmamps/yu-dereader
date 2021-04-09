import * as dom from '../dom';
import { EggData } from './types';
import NOT_FOUND from './not_found';


const NAME = 'Contact';
const KEY = 'contact';

/**
 * Get subject in contact link
 */
const get = async function getContactSubject(): Promise<EggData> {
	const head = NAME;
	const href = dom.query('.topnav a[href^=mailto]').getAttribute('href');
	const val = new URL(href).searchParams.get('subject') ?? NOT_FOUND;

	return {head, val};
}

export {
	get,
	NAME as name,
	KEY as key,
};
