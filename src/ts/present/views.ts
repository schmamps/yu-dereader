import * as dom from '../dom';
import * as eggs from './eggs';
import { Canon } from '../comic/canon';
import { ComicView, ComicViewList } from '../views/list';


/**
 * Get complete path to `nomSrc`
 */
const getPath = (nomSrc: string): string => {
	return nomSrc.includes('.') ? nomSrc : `${nomSrc}.png`;
}

/**
 * Group views in a category
**/
const groupViews = (
	label: string,
	catViews: ComicView[],
	defaultSrc: string
): HTMLOptGroupElement => {
	const group = <HTMLOptGroupElement> dom.create('optgroup', {label});

	for (const view of catViews) {
		const option = <HTMLOptionElement> dom.create('option');

		option.textContent = view.title;
		option.value = view.param;
		option.dataset.position = view.position;
		option.dataset.src = (view.src) ? getPath(view.src) : defaultSrc;

		group.appendChild(option);
	}

	return group;
};


/**
 * Add view selector to easter egg nest
 */
async function listViews(views: ComicViewList, canon: Canon) {
	const title = eggs.wrap('Views');
	const detail = dom.create('select');

	// @ts-ignore - downlevel iteration
	for (const label of views.keys()) {
		detail.appendChild(groupViews(label, views.get(label), canon.src));
	}

	eggs.deposit(title, detail);

	return detail;
}


export {
	listViews as list,
};
