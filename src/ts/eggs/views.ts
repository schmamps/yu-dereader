import views from './../../../anqwtz/app/data/views.json';
import { EggData } from './types';


const NAME = 'View';
const KEY = 'views';
type ComicView = {
	title: string,
	src: string,
	param: string,
	position: string,
};
type ComicViewList = Map<string, ComicView[]>;
type HasCategoryID = { catID: number, };
type ViewDefaults = ComicView & HasCategoryID;
type BasicView = Partial<ViewDefaults>;
type ViewData = {
	categories: string[],
	defaults: ViewDefaults,
	views: BasicView[],
};


/**
 * Sort views within a category
**/
const sortViews = (
	a: ComicView,
	b: ComicView
): number => {
	if (b.src === '') {
		return 1;
	}

	if (a.src === '' || a.title < b.title) {
		return -1;
	}

	return 1;
};


/**
 * Sort views by category
**/
const sortCategories = (viewList: ComicViewList): ComicViewList => {
	return Array.from(viewList.keys()).reduce(
		(sorted, key) => {
			sorted.set(key, viewList.get(key).sort(sortViews));

			return sorted;
		},
		new Map()
	);
};


/**
 * Get short form of title
**/
const getShorty = (basic: BasicView, defaultTitle: string): string => {
	const {param = false, title = defaultTitle} = basic;

	if (param === '') { return param; }

	return title.toLowerCase().replace(/[^a-z]+/g, '');
};


/**
 * Flesh out complete view data
**/
const expandView = (
	basic: BasicView,
	categories: string[],
	defaults: ViewDefaults,
): [ComicView, string] => {
	const short = getShorty(basic, defaults.title)

	return [
		{
			title: basic.title ?? defaults.title,
			src: basic.src ?? short,
			param: basic.param ?? short,
			position: basic.position ?? defaults.position,
		},
		categories[basic.catID ?? defaults.catID]
	]
};


/**
 * Categorize views
**/
const categorizeViews = (vwData: ViewData): ComicViewList => {
	const mapped = new Map(vwData.categories.map((catName) => [catName, []]));

	vwData.views.forEach((basic) => {
		const [view, catName] = expandView(
			basic,
			vwData.categories,
			vwData.defaults
		);

		mapped.get(catName).push(view);
	});

	return mapped;
};

const get = async function listAllViews(): Promise<EggData> {
	const head = NAME;

	try {
		const val = sortCategories(categorizeViews(views));

		return {head, val};
	}
	catch (_) {
		return {head, val: new Map()};
	}
};

export {
	get,
	NAME as name,
	KEY as key,
	ComicView,
	ComicViewList,
};
