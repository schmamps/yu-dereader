const generate = {
	anchor: (href) => (dom.
		query('#blogpost center > a').
		setAttribute('name', href.substr(1))
	),

	getPost: () => document.getElementById('blogpost'),

	scroll: () => {
		const post =  generate.getPost();

		post.classList.add('angola');
	},

	transitionEnd: () => {
		const post = generate.getPost();

		post.classList.remove('angola');
	},

	monkey: () => {
		const post = generate.getPost();
		const pad = document.documentElement.clientHeight - 200;

		post.addEventListener('transitionend', generate.transitionEnd);
		dom.query('#container').style.minHeight = pad + 'px';
	},

	rss: (name, value) => {
		const href = '#angola-maldives';
		const [head, content] = dom.create('h2', 'a');

		head.textContent = name;
		content.innerHTML = value;
		content.setAttribute('href', href);
		content.addEventListener('click', generate.scroll);
		generate.anchor(href);
		generate.monkey();

		return [head, content];
	},

	basic: (name) => (value) => {
		const [head, content] = dom.create('h2', 'div');

		head.textContent = name;
		content.innerHTML = value;

		return [head, content];
	},
};

const config = {
	eggs: () => (Promise.resolve([
		{
			hatch: generate.basic('Title'),

			select: () => comic.element,

			develop: (elem) => {
				const original = elem.getAttribute('title');
				const next = 'DOUBLE CLICK FOR MORE AWESOME FUN TIMES!';

				elem.setAttribute('title', next);

				return original;
			},
		},
		{
			hatch: generate.basic('Contact'),

			select: () => dom.query('.topnav a[href^=mailto]'),

			develop: (elem) => (Promise.
				resolve(elem.getAttribute('href')).
				then(params.parse).
				then((params) => params.subject)
			),
		},
		{
			hatch: (value) => generate.rss('RSS', value),

			select: () => {
				const xp = '//body//comment()[contains(., \'rss-title\')]';

				return dom.eval(xp);
			},

			develop: (elem) => elem.data.trim(),
		},
	])),

	characters: {
		src: (nominal) => nominal.split('.png')[0] + '.png',

		rather: (desc) => desc.replace(/[^a-z]/gi, '').toLowerCase(),

		alt: (label) => {
			const rather = config.characters.rather(label);

			return {rather, desc: label};
		},

		default: () => ({rather: '', desc: 'Standard View'}),

		create: (nomSrc, label = '', pos = '0 0', sort = 0) => new Promise(
			(resolve) => {
				const src = config.characters.src(nomSrc);
				const method = (label) ? 'alt' : 'default';

				resolve(Object.assign(
					{src, pos, sort},
					config.characters[method](label)
				));
			}
		),

		generate: (alts) => Promise.all(
			alts.map((alt, idx) => {
				const [nomSrc, label, pos = '0 0'] = alt;

				return config.characters.create(nomSrc, label, pos, idx + 1);
			})
		),
	},

	alts: () => config.characters.generate([
		['assimilated', 'One Where T-Rex Got Assimilated'],
		['clothes', 'One Where T-Rex Wears More'],
		['frig', 'One Where T-Rex Swears More'],
		['feathers', 'Something More Historically Accurate'],
		['lastever', 'The Last Dinosaur Comic Ever'],
		['penny', 'Penny Arcade', '7px 8px'],
		['problemsleuth', 'Problem Sleuth'],
		['xkcd', 'XKCD'],
	]),
};
