import * as dom from '../dom';
import { Overlay, OverlayCollection } from '../types/seeding';


/**
 * Create label for overlay selector
**/
const createLabel = () => {
    return <HTMLSpanElement>dom.create('span', 'Overlay');
};

/**
 * Get full path to nominal source (`nomSrc`)
 */
const getPath = (nomSrc: string): string => {
    return nomSrc.includes('.') ? nomSrc : `${nomSrc}.png`;
}

/**
 * Create OPTION for `overlay`
**/
const createOption = (
    overlay: Overlay,
    canonSrc: string
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
    overlays: OverlayCollection,
    groupName: string,
    canonSrc: string
): HTMLOptGroupElement => {
    const options = overlays.get(groupName) ?? [];
    const optionElms = options.map((over) => createOption(over, canonSrc));
    const optgroup = optionElms.reduce(
        (group, option) => {
            group.appendChild(option);

            return group;
        },
        <HTMLOptGroupElement>dom.create('optgroup')
    )

    optgroup.label = groupName;

    return optgroup;
};

/**
 * Create SELECT for `overlays`
**/
const displayControl = (
    overlays: OverlayCollection,
    canonSrc: string
) => {
    const groups = (Array.from(overlays.keys()) ?? []).map(
        (groupName) => groupOverlays(overlays, groupName, canonSrc)
    );

    const select = groups.reduce(
        (ctrl, group) => {
            ctrl.appendChild(group);

            return ctrl;
        },
        <HTMLSelectElement>dom.create('select')
    );

    return select;
};

export {
    displayControl as lay
};

