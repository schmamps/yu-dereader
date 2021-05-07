import { hatch as rss } from './rss';
import { hatch as view } from './view';


const noop = () => {};

export {
	noop as title,
	noop as contact,
	rss,
	view,
};

