import { ID, RATHER } from '../../consts';


/**
 * Get URL object from current `window.location.href`
**/
const getCurrentURL = ():URL => {
	const {href} = window.location;

	return new URL(href);
};

/**
 * Update `params` in URL, current or `from` specified URL
**/
const updateURL = (
	params:object,
	from?:string
):any => {
	const base = from ? new URL(from) : getCurrentURL();
	const PHP = '.php'
	const url = new URL(base.origin);

	url.pathname = base.pathname.endsWith(PHP) ? base.pathname : `index${PHP}`;

	for (const key of [ID, RATHER]) {
		const val = params[key] ?? base.searchParams.get(key);

		if (val) { url.searchParams.set(key, val); }
	}

	return url;
};

export {
	getCurrentURL as current,
	updateURL as update,
};
