import { Canon } from '../canon';
import { NOT_FOUND } from '../consts';
import * as egg from '../egg';


/**
 * Get comic title
 */
const getTitleAttr:egg.Seeder = (canon: Canon) => {
	const head = 'Title';

	return Promise.
		resolve(canon.element.title ?? NOT_FOUND).
		then((val) => ({head, val}));
}

export {
	getTitleAttr as get,
};
