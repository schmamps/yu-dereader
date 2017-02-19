/**
 * Get parameter from query string
 *
 * @param {String} uri
 * @param {String} parameter
 * @returns String
 */
function getQueryParameter(uri, parameter) {
	var re = new RegExp('^(.+' + parameter + '=)(.+?)($|&).*');
	var enc = uri.replace(re, '$2');

	if (enc === uri) { return ''; }

	try {
		return decodeURIComponent(enc);
	}
	catch (e) {
		return enc.replace('%20', ' ');
	}
}

/**
 * Create placeholder for egg
 *
 * @param {String} name
 * @returns Element
 */
function layEgg(name) {
	var yolk = document.createElement('strong');
	yolk.className = 'head ' + name;
	yolk.style.paddingRight = '.5em';
	yolk.innerText = name + ':';

	var zygote = document.createElement('span');
	zygote.className = 'var ' + name;
	zygote.style.paddingBottom = '.5em';
	zygote.innerHTML = '<em>loading&hellip;</em>';

	var egg = document.createElement('li');
	egg.appendChild(yolk);
	egg.appendChild(zygote);
	return egg;
}

/**
 * Create placeholders to display egg data
 *
 * @param {Element} comic
 */
function buildNest(comic) {
	var clutch = document.createElement('ul');
	clutch.className = 'clutch';
	clutch.style.width = comic.clientWidth + 'px';
	clutch.style.margin = '0 auto';
	['Title', 'Contact', 'RSS'].map(function(name) {
		clutch.appendChild(layEgg(name));
	});

	var nest = document.createElement('td');
	nest.setAttribute('colspan', 3);
	nest.appendChild(clutch);

	document.querySelector('center table tbody').appendChild(nest);
}

/**
 * Render egg value
 *
 * @param {String} name
 * @param {Function} getter
 */
function hatchEgg(name, getter) {
	var notFound = '<em>not found</em>';
	var elm = document.querySelector('.clutch span.var.' + name);

	try {
		var egg = getter();
		elm.innerHTML = egg ? egg : notFound;
	}
	catch (e) {
		elm.innerHTML = notFound;
	}
}

document.addEventListener('readystatechange', function() {
	if (document.readyState !== 'complete') { return; }

	var comic = document.querySelector('img.comic');

	buildNest(comic);

	hatchEgg('Title', function() {
		return comic.getAttribute('title');
	});

	hatchEgg('Contact', function() {
		var mailto = document.querySelector('.topnav a[href^=mailto]');
		return getQueryParameter(mailto.getAttribute('href'), 'subject');
	});

	hatchEgg('RSS', function() {
		var body = document.querySelector('body');
		var item, itemData = false;

		var i = 0;
		do {
			item = body.childNodes[i];
			if (item.nodeType === 8 && item.data.includes('rss-title')) {
				itemData = item.data;
			}

			++i;
		} while (itemData === false);

		var re = /rss\-title[^>]+>([^<]*)/;
		return itemData.match(re)[1];
	});
});
