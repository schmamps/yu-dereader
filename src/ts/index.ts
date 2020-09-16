import * as comic from './comic';
import * as eggs from './eggs';
import * as present from './present';
import * as views from './views';


const main = () => {
	const element = comic.get.element();
	const canon = comic.get.canon();

	eggs.
		listAll(element).
		then(present.eggs).
		catch(present.error('Eggs'));


	views.
		listAll().
		then((views) => present.views(views, canon)).
		then((vwSel: HTMLSelectElement) => {
			present.interface(element, canon, vwSel)
		}).
		catch(present.error('Views'));
};

main();
