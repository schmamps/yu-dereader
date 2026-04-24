import * as dom from '../dom';

/**
 * write title content
 */
const displayTitle = async (comicTitle: string): Promise<HTMLSpanElement> => {
	const span = <HTMLSpanElement>dom.create(
		'span',
		{ textContent: comicTitle, class: 'title' }
	);

	return span;
}

export { displayTitle as lay };
