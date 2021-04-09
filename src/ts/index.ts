import * as comic from './comic';
import * as eggs from './eggs';
import * as display from './display'



const main = () => {
	for (const key of eggs.keys()) {
		const getEgg = <eggs.Getter>eggs[key].get;
		const layEgg = <display.EggLayer>display[key];

		getEgg().then((e) => layEgg(e.head, e.val));
	}
};

main();
