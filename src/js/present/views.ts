import * as dom from '../dom';
import * as eggs from './eggs';
import { ComicView, ComicViewList } from '../views/list';


/**
 * Group views in a category
**/
const groupViews = (
	label: string,
	catViews: ComicView[]
): HTMLOptGroupElement => {
	const group = <HTMLOptGroupElement> dom.create('optgroup', {label});

	for (const view of catViews) {
		const option = <HTMLOptionElement> dom.create('option');

		option.textContent = view.title;
		option.value = view.param;
		option.dataset.position = view.position;
		option.dataset.src = view.src;

		group.appendChild(option);
	}

	return group;
};


/**
 * Add view selector to easter egg nest
 */
async function listViews(views: ComicViewList) {
	const title = eggs.wrap('Views');
	const detail = dom.create('select');

	// @ts-ignore - downlevel iteration
	for (const label of views.keys()) {
		detail.appendChild(groupViews(label, views.get(label)));
	}

	eggs.deposit(title, detail);

	return detail;
}


export {
	listViews as list,
};
