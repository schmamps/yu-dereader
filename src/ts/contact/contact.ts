import { NOT_FOUND } from '../consts';
import * as dom from '../dom';
import * as egg from '../egg';

/**
 * Get subject in contact link
 */
const getContactSubject:egg.Seeder = () => {
	return Promise.
		resolve(dom.query('.topnav a[href^=mailto]').getAttribute('href')).
		then((href) => new URL(href).searchParams.get('subject') ?? NOT_FOUND).
		then((val) => ({head: 'Contact', val}));
}

export {
	getContactSubject as get,
};
