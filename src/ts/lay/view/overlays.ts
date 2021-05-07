import * as dom from '../../dom';
import { Overlay, OverlayCollection } from '../../view';


/**
 * Create label for overlay selector
**/
const createLabel = () => {
	return <HTMLSpanElement>dom.create('span', 'Overlay');
};

/**
 * Get full path to nominal source (`nomSrc`)
 */
 const getPath = (nomSrc:string): string => {
	return nomSrc.includes('.') ? nomSrc : `${nomSrc}.png`;
}

/**
 * Create OPTION for `overlay`
**/
const createOption = (
	overlay:Overlay,
	canonSrc:string
) => {
	const option = <HTMLOptionElement>dom.create('option', overlay.title);

	option.value = overlay.param ?? '';
	option.dataset.position = overlay.position ?? '0 0'
	option.dataset.src = `/${(overlay.src) ? getPath(overlay.src) : canonSrc}`;

	return option;
};

/**
 * Create OPTGROUP labeled `groupName` with options from `overlays`
**/
const groupOverlays = (
	overlays:OverlayCollection,
	groupName:string,
	canonSrc:string
):HTMLOptGroupElement => {
	const options = overlays.
		get(groupName).
		map((over) => createOption(over, canonSrc));
	const optgroup = <HTMLOptGroupElement>dom.wrap('optgroup', options);

	optgroup.label = groupName;

	return optgroup;
};

/**
 * Create SELECT for `overlays`
**/
const createControl = (
	overlays:OverlayCollection,
	canonSrc:string
) => {
	const groups = Array.
		from(overlays.keys()).
		map((groupName) => groupOverlays(overlays, groupName, canonSrc));
	const select = <HTMLSelectElement>dom.wrap('select', groups);

	return select;
};

export {
	createLabel as label,
	createControl as control,
};
