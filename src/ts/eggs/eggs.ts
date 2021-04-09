import * as rendering from './rendering';
import * as contact from './contact';
import * as rss from './rss';
import * as title from './title';
import * as views from './views';
import { EggData, EggGetter } from './types';


/**
 * List module keys
 * @returns {}
**/
const listKeys = ():Array<string> => ([
	'title',
	'contact',
	'rss',
	'rendering',
	'views',
]);

export {
	listKeys as keys,
	title,
	contact,
	rss,
	rendering,
	views,
	EggData as Data,
	EggGetter as Getter,
};
