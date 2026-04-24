import { Canon } from '../types/seeding';

/**
 * Get comic title
 */
const getTitleAttr = async (canon: Canon): Promise<string> => {
	const title = canon.element.title;

	return title;
}

export {
	getTitleAttr as get
};

