import { error as err } from './error';
import * as hatch from './hatch';
import * as lay from './lay';
import * as seed from './seed';

/**
 * main routine
 */
const main = () => {
	const canon = seed.canon();

	Promise.
		resolve().
		then(seed.hidpi).
		then(lay.hidpi).
		then(hatch.hidpi).
		catch(err('HiDPI', canon))
		;

	Promise.
		resolve(canon).
		then(seed.title).
		then(lay.title).
		then(hatch.title).
		catch(err('Title', canon))
		;

	Promise.
		resolve().
		then(seed.contact).
		then(lay.contact).
		then(hatch.contact).
		catch(err('Contact', canon))
		;

	Promise.
		resolve().
		then(seed.rss).
		then(lay.rss).
		then(hatch.rss).
		catch(err('RSS', canon))
		;

	Promise.
		resolve().
		then(seed.overlays).
		then((overlays) => lay.overlays(overlays, canon.src)).
		then((control) => hatch.overlays(control, canon)).
		catch(err('Overlays', canon))
		;
};

main();
