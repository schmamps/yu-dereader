import * as comic from './comic';
import * as eggs from './eggs';
import * as present from './present';
import * as views from './views';

eggs.
	listAll(comic.get.element()).
	then(present.eggs).
	catch(present.error('Eggs'))
;

views.
	listAll().
	then(present.views).
	then((vwSel: HTMLSelectElement) => present.interface(comic.get.canon(), vwSel)).
	catch(present.error('Views'))
;
