import * as egg from '../egg';
import * as overlays from '../overlays';
import * as rendering from '../rendering';


type Overlay = {
	title:string,
	src:string,
	param:string,
	position:string,
};
type OverlayCollection = Map<string, Overlay[]>;

/**
 * Get all image overlays
**/
function getViewComponents(fn:egg.Seeder) {
	const defaults = {head: 'View', val: [new Map(), false]};

	return Promise.
		all([overlays.get(), rendering.get()]).
		then((val) => Object.assign({}, defaults, {val})).
		catch(() => Promise.resolve(defaults));
};

export {
	getViewComponents as get,
	Overlay,
	OverlayCollection,
};
