import * as dom from '../dom';

/**
 * write contact content
 */
const displayContact = async (msg: string) => {
	const span = <HTMLSpanElement>dom.create(
		'span',
		{ textContent: msg, class: 'contact' }
	);

	return span;
}

export { displayContact as lay };

