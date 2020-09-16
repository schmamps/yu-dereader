import CONSTS from '../consts';
import * as dom from '../dom';
import { EasterEgg } from '../eggs/';


const nest = dom.query(CONSTS.NEST);


const wrappers = {
	/**
	 * Wrap title text
	 */
	title: (text: string): HTMLElement => dom.create('h2', {text}),
	/**
	 * Wrap RSS content
	 */
	RSS: (content: string) => {
		return dom.create('a', {href: '#yu-dereader', html: content});
	},
	/**
	 * Wrap other content
	 */
	default: (content: string) => {
		return dom.create('span', {text: content});
	},
};


/**
 * Find & apply wrapper function for `itemVal` of type `itemType`
 */
const wrapItem = (itemVal: any, itemType: string = 'title') => {
	const wrap = wrappers[itemType] ?? wrappers.default;

	return wrap(itemVal);
};


/**
 * Add egg to nest
 */
const depositEgg = (
	title: HTMLElement,
	detail: HTMLElement,
) => {
	const egg = dom.create('tr', {class: 'egg'});

	egg.appendChild(dom.create('td', {colspan: 3}));
	egg.children[0].appendChild(dom.create('div'));

	for (const elm of [title, detail]) {
		egg.children[0].children[0].appendChild(elm);
	}

	nest.appendChild(egg);
};


/**
 * Display easter eggs inline
 */
async function listEggs(clutch: EasterEgg[]) {
	for (let egg of clutch) {
		const title = wrapItem(egg.title);
		const detail = wrapItem(egg.content, egg.title);

		depositEgg(title, detail);
	}
}


export {
	listEggs as list,
	depositEgg as deposit,
	wrapItem as wrap,
};
