import * as find from './find';


export type EasterEgg = {
	title: string,
	content: string,
};


/**
 * List content easter eggs
 * @throws
 */
async function listEggs(
	srcElm: HTMLElement
): Promise<EasterEgg[]> {
	const eggTitles = Object.keys(find);
	const hatch = async function(eggTitle: string) {
		const content = find[eggTitle](srcElm);

		return {title: eggTitle, content,};
	};

	return Promise.
		all(eggTitles.map(hatch)).
		catch((e) => {
			e.__ = 'listing content eggs'

			throw e;
		});
}

export {
	listEggs as listAll,
};
