import * as canon from './canon';
import * as contact from './contact';
import * as egg from './egg';
import * as hatch from './hatch';
import * as lay from './lay';
import * as rss from './rss';
import * as title from './title';
import * as view from './view';


/**
 * main routine
 */
const main = () => {
	const seed = {title, contact, rss, view};

	for (const name of Object.keys(seed)) {
		const egg = {
			seed: <egg.Seeder>seed[name].get,
			lay: <egg.Layer>lay[name],
			hatch: <egg.Hatcher>hatch[name],
		};

		egg.seed(canon).
			then((seeded) => egg.lay(seeded, canon)).
			then((laid) => egg.hatch(laid, canon));
	}
};

main();
