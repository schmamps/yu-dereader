import * as hatch from './hatch';
import * as lay from './lay';
import * as seed from './seed';

/**
 * main routine
 */
const main = () => {
	const canon = seed.canon();
	const err = (category: string) => {
		return (e: Error) => {
			console.group('Yu Dereader Error');
			console.log(`error in category '${category}'`);
			console.dir(e);
			console.dir(canon);
			console.groupEnd();
		}
	}

	Promise.all([
		seed.
			hidpi().
			then(lay.hidpi).
			then(hatch.hidpi).
			catch(err('HiDPI')),
		seed.
			title(canon).
			then(lay.title).
			then(hatch.title).
			catch(err('Title')),
		seed.
			contact().
			then(lay.contact).
			then(hatch.contact).
			catch(err('Contact')),
		seed.
			rss().
			then(lay.rss).
			then(hatch.rss).
			catch(err('RSS'))
	]).then(() => {
		seed.
			overlays().
			then((overlays) => lay.overlays(overlays, canon.src)).
			then((control) => hatch.overlays(control, canon)).
			catch(err('Overlays'));
	});
};

main();
