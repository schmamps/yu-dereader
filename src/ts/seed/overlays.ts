import OVERLAYS from '../../../anqwtz/app/data/overlays.json';
import { Overlay, OverlayCollection } from '../types/seeding';

type HasCategoryID = { catID: number, };
type ViewDefaults = Overlay & HasCategoryID;
type BasicOverlay = Partial<ViewDefaults>;
type OverlayData = {
	categories: string[],
	defaults: ViewDefaults,
	overlays: BasicOverlay[],
};

/**
 * Sort views within a category
**/
const sortViews = (
	a: Overlay,
	b: Overlay
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
const sortCategories = (viewList: OverlayCollection): OverlayCollection => {
	return Array.from(viewList.keys()).reduce(
		(sorted, key) => {
			sorted.set(key, viewList.get(key)?.sort(sortViews));

			return sorted;
		},
		new Map()
	);
};


/**
 * Get short form of title
**/
const getShorty = (basic: BasicOverlay, defaultTitle: string): string => {
	const { param = false, title = defaultTitle } = basic;

	if (param === '') { return param; }

	return title.toLowerCase().replace(/[^a-z]+/g, '');
};


/**
 * Flesh out complete view data
**/
const expandView = (
	basic: BasicOverlay,
	categories: string[],
	defaults: ViewDefaults,
): [Overlay, string] => {
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
const categorizeViews = (vwData: OverlayData): OverlayCollection => {
	const mapped: Map<string, Overlay[]> = new Map(
		vwData.categories.map((catName) => [catName, []])
	);

	vwData.overlays.forEach((basic) => {
		const [view, catName] = expandView(
			basic,
			vwData.categories,
			vwData.defaults
		);

		mapped.get(catName)?.push(view);
	});

	return mapped;
};

/**
 * List all overlay views
**/
const listViews = (): Promise<OverlayCollection> => {
	return Promise.
		resolve(OVERLAYS).
		then(categorizeViews).
		then(sortCategories);
};

/**
 * Get all image overlays
**/
const getOverlays = async (): Promise<OverlayCollection> => {
	const overlays = listViews().catch(() => new Map());

	return overlays;
};

export {
	getOverlays as get
};

