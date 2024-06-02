(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={
	"categories": [
		"T-Rex and Pals",
		"Other Friends"
	],
	"defaults": {
		"title": "",
		"src": "",
		"param": "",
		"position": "0 0",
		"category": "",
		"catID": 0
	},
	"overlays": [
		{
			"title": "The Canonical Cartoon",
			"src": "",
			"param": ""
		},
		{
			"title": "One Where T-Rex Got Assimilated",
			"src": "assimilated"
		},
		{
			"title": "One Where T-Rex Wears More",
			"src": "clothes"
		},
		{
			"title": "One Where T-Rex Swears More",
			"src": "frig"
		},
		{
			"title": "Something More Historically Accurate",
			"src": "feathers"
		},
		{
			"title": "The Last Dinosaur Comic Ever",
			"src": "lastever"
		},
		{
			"title": "Before the Special Effects Are Added"
		},
		{
			"title": "One Done in Watercolours",
			"src": "watercolours"
		},
		{
			"title": "D.C. Comics",
			"src": "batman"
		},
		{
			"title": "Just About T-Rex",
			"src": "moretrex"
		},
		{
			"title": "About Pirates",
			"src": "pirates"
		},

		{
			"title": "Dr. McNinja",
			"src": "mcninja"
		},
		{
			"title": "Penny Arcade",
			"src": "penny",
			"position": "7px 8px",
			"catID": 1
		},
		{
			"title": "Problem Sleuth",
			"catID": 1
		},
		{
			"title": "XKCD",
			"catID": 1
		},
		{
			"title": "Sweet Bro and Hella Jeff",
			"src": "sbahj",
			"catID": 1
		},
		{
			"title": "A Lesson Is Learned But the Damage Is Irreversible",
			"src": "alil",
			"catID": 1
		},
		{
			"title": "BRODYQUEST",
			"src": "brodyquest.gif",
			"catID": 1
		},
		{
			"title": "Buttercup Festival",
			"catID": 1
		},
		{
			"title": "Daisy Owl",
			"catID": 1
		},
		{
			"title": "Nedroid",
			"catID": 1
		},
		{
			"title": "Pokey the Penguin",
			"src": "pokey",
			"param": "pokey",
			"catID": 1
		},
		{
			"title": "Shortpacked!",
			"catID": 1
		},
		{
			"title": "Wigu Adventures",
			"src": "wigu",
			"param": "wigu",
			"catID": 1
		},
		{
			"title": "Wondermark",
			"catID": 1
		},
		{
			"title": "Achewood",
			"position": "0 30px",
			"catID": 1
		},
		{
			"title": "Registered Weapon",
			"catID": 1
		},
		{
			"title": "Sister Claire",
			"catID": 1
		},
		{
			"title": "The RIAA Version of the Internet",
			"src": "censored.gif",
			"param": "theRIAAversionoftheinternet",
			"catID": 1
		}
	]
}

},{}],2:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = exports.src = exports.id = void 0;
const dom = __importStar(require("../dom"));
;
const getSrc = () => {
    const elm = dom.meta('og:image');
    if (!elm) {
        throw new Error('error getting canonical image');
    }
    return elm.content.replace(/^http.+(comics.+)$/, '$1');
};
const getCanonURL = () => {
    const elm = dom.meta('og:url');
    if (!elm) {
        throw new Error('error getting canonical URL');
    }
    return new URL(elm.content);
};
const getId = () => {
    try {
        const url = getCanonURL();
        return Number(url.searchParams.get('comic'));
    }
    catch (e) {
        e.__ = 'error getting canonical ID';
        throw e;
    }
};
const getElement = () => {
    const found = dom.query([
        'body',
        'center tbody',
        'tr:nth-child(1)',
        'td:nth-child(2) img:last-child'
    ].join(' > '));
    if (found) {
        return found;
    }
    throw new Error('comic not found');
};
const id = getId();
exports.id = id;
const src = getSrc();
exports.src = src;
const element = getElement();
exports.element = element;

},{"../dom":8}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./canon"), exports);

},{"./canon":2}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNPIXEL = exports.ID = exports.TRANS_DURATION = exports.RATHER = exports.NOT_FOUND = void 0;
exports.NOT_FOUND = '(not found)';
exports.RATHER = 'butiwouldratherbereading';
exports.TRANS_DURATION = 800;
exports.ID = 'comic';
exports.UNPIXEL = 'unpixelate';

},{}],5:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const consts_1 = require("../consts");
const dom = __importStar(require("../dom"));
const getContactSubject = () => {
    return Promise.
        resolve(dom.query('.topnav a[href^=mailto]').getAttribute('href')).
        then((href) => new URL(href).searchParams.get('subject') ?? consts_1.NOT_FOUND).
        then((val) => ({ head: 'Contact', val }));
};
exports.get = getContactSubject;

},{"../consts":4,"../dom":8}],6:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./contact"), exports);

},{"./contact":5}],7:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrap = exports.values = exports.all = exports.query = exports.meta = exports.listen = exports.eval = exports.create = void 0;
const is = __importStar(require("./is"));
;
;
;
const isAttrKey = (keyName) => {
    return ![
        'innerHTML',
        'className',
        'classList',
        'textContent',
        'dataset',
        'checked',
    ].includes(keyName);
};
const attrify = (optSpec) => {
    const attrs = {};
    for (const key of Object.keys(optSpec).filter(isAttrKey)) {
        attrs[key] = optSpec[key].toString();
    }
    if (optSpec.checked) {
        attrs.checked = true;
    }
    return attrs;
};
const classify = (classSpec, listSpec) => {
    const cList = classSpec ? classSpec.split(' ') : (listSpec ?? []);
    return cList.
        map((cName) => cName.trim()).
        filter((cName) => cName.length > 0);
};
const parseCreateArgs = (args) => {
    const flat = args.flat(Infinity);
    const children = flat.filter(is.child);
    const prop = flat.
        filter(is.propList).
        reduce((all, one) => Object.assign(all, one), {});
    const html = flat.filter(is.string).join(' ') ||
        (prop.innerHTML ?? prop.textContent ?? '');
    const dataset = prop.dataset ?? {};
    const classList = classify(prop.class ?? '', prop.classList ?? []);
    return { attrs: attrify(prop), html, classList, dataset, children };
};
const create = (tagName, ...args) => {
    const elm = document.createElement(tagName);
    const { html, classList, children, dataset, attrs } = parseCreateArgs(args);
    elm.innerHTML = html;
    classList.forEach((className) => elm.classList.add(className));
    children.forEach((child) => elm.appendChild(child));
    Object.entries(dataset).forEach(([key, val]) => elm.dataset[key] = val);
    Object.entries(attrs).forEach(([key, val]) => elm.setAttribute(key, val));
    return elm;
};
exports.create = create;
const evalAll = (xPath) => {
    return document.evaluate(xPath, document, null, 0);
};
const evalOne = (xPath) => {
    const all = evalAll(xPath);
    return all.iterateNext();
};
exports.eval = evalOne;
const listen = (context) => {
    const on = (eventName, handler) => {
        context.addEventListener(eventName, handler);
    };
    return { on };
};
exports.listen = listen;
const query = (sel, context = document) => {
    return context.querySelector(sel);
};
exports.query = query;
const all = (sel, context = document) => {
    return Array.from(context.querySelectorAll(sel));
};
exports.all = all;
const meta = (property) => {
    return query(`meta[property="${property}"]`);
};
exports.meta = meta;
const values = (sel) => {
    return Array.
        from(sel.options).
        map((opt) => opt.value ?? '');
};
exports.values = values;
const wrap = (tagName, ...children) => {
    const parent = create(tagName);
    for (const child of children.flat(Infinity)) {
        parent.appendChild(child);
    }
    return parent;
};
exports.wrap = wrap;

},{"./is":9}],8:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./dom"), exports);

},{"./dom":7}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propList = exports.child = exports.string = void 0;
const isType = (typeStr) => (val) => typeof (val) === typeStr;
const isString = isType('string');
exports.string = isString;
const isObject = isType('object');
const isElement = (val) => val?.tagName ?? false;
const isChild = (val) => isObject(val) && isElement(val);
exports.child = isChild;
const isPropList = (val) => isObject(val) && !isElement(val);
exports.propList = isPropList;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = exports.rss = exports.contact = exports.title = void 0;
const rss_1 = require("./rss");
Object.defineProperty(exports, "rss", { enumerable: true, get: function () { return rss_1.hatch; } });
const view_1 = require("./view");
Object.defineProperty(exports, "view", { enumerable: true, get: function () { return view_1.hatch; } });
const noop = () => { };
exports.title = noop;
exports.contact = noop;

},{"./rss":12,"./view":13}],11:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./hatch"), exports);

},{"./hatch":10}],12:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hatch = void 0;
const dom = __importStar(require("../dom"));
const createPostAnchor = (name) => {
    const header = dom.query('#blogpostheader');
    const anchor = dom.create('a', { name });
    header.appendChild(anchor);
};
const padContainer = () => {
    const cont = dom.query('div#container');
    const footHt = cont.nextElementSibling.getBoundingClientRect().height;
    const fullHt = dom.query('html').getBoundingClientRect().height;
    const mHt = Math.max(cont.getBoundingClientRect().height, fullHt - footHt);
    cont.style.minHeight = `${mHt}px`;
};
const getBlogAnchor = (hash) => {
    const name = hash.substr(1);
    return dom.query(`a[name=${name}]`);
};
const getBlogTop = (hash) => {
    const anchor = getBlogAnchor(hash);
    return anchor.getBoundingClientRect().top;
};
const onClick = (e) => {
    e.preventDefault();
    const fudge = window.scrollY - 6;
    const top = fudge + getBlogTop(e.currentTarget.hash);
    const behavior = 'smooth';
    window.scroll({ top, behavior });
};
const hatchRSS = (link) => {
    const anchorName = 'yu-dereader';
    createPostAnchor(anchorName);
    padContainer();
    link.setAttribute('href', `#${anchorName}`);
    dom.listen(link).on('click', onClick);
};
exports.hatch = hatchRSS;

},{"../dom":8}],13:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./view"), exports);

},{"./view":17}],14:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hatch = void 0;
const consts_1 = require("../../consts");
const dom = __importStar(require("../../dom"));
const urls = __importStar(require("./urls"));
const getEffectiveOverlay = (validOverlays, spec) => {
    if (validOverlays.includes(spec)) {
        return spec;
    }
    return '';
};
const updateComic = (comic, src, pos) => {
    const rotY = Number(comic.style.transform.replace(/\D/g, ''));
    const setImage = () => { comic.src = src; };
    window.setTimeout(setImage, consts_1.TRANS_DURATION / 2);
    comic.style.transform = `rotateY(${((rotY + 360) % 720)}deg)`;
    comic.style.backgroundPosition = pos;
};
const pushState = (comic, target) => {
    const update = { [consts_1.RATHER]: target.selectedOptions[0].value };
    const { src, position } = target.selectedOptions[0].dataset;
    for (const arrow of ['left', 'right']) {
        try {
            const selector = `td[align=${arrow}] .nohover a`;
            const a = dom.query(selector);
            a.href = urls.update(update, a.href);
        }
        catch (_) {
            const prob = (arrow === 'left') ? ' not' : '';
            console.info(`Error updating ${arrow} arrow link.
This is (probably${prob}) fine!`);
        }
    }
    window.history.pushState(update[consts_1.RATHER], document.title, urls.update(update));
    updateComic(comic, src, position);
};
const setState = (comic) => (arg) => {
    const target = arg.currentTarget;
    pushState(comic, target);
};
const pickState = (overCtl, comic) => (_) => {
    const optCount = overCtl.options.length;
    let newIdx = overCtl.selectedIndex;
    while (newIdx === overCtl.selectedIndex) {
        newIdx = Math.floor(Math.random() * optCount);
    }
    overCtl.selectedIndex = newIdx;
    pushState(comic, overCtl);
};
const getOption = (overCtl, val) => {
    const idx = Math.max(0, dom.values(overCtl).indexOf(val.toString()));
    overCtl.selectedIndex = idx;
    return overCtl.selectedOptions[0];
};
const popState = (overCtl, comic) => (e) => {
    const { src, position } = getOption(overCtl, e.state.toString()).dataset;
    updateComic(comic, src, position);
};
async function initComic(images, comic, src) {
    const rel = 'prefetch';
    for (const href of images) {
        const link = dom.create('link', { rel, href });
        document.head.appendChild(link);
    }
    comic.style.backgroundImage = `url(${src})`;
    comic.style.transition = [
        `transform ${consts_1.TRANS_DURATION}ms`,
        `background-position 0ms ease ${consts_1.TRANS_DURATION / 2}ms`
    ].join(', ');
}
const listImages = (overCtl) => {
    return Array.
        from(overCtl.options).
        slice(1).
        map((opt) => opt.dataset.src);
};
const hatchOverlays = (canon, overCtl) => {
    const overlay = getEffectiveOverlay(dom.values(overCtl), urls.current().searchParams.get(consts_1.RATHER));
    const permalink = urls.update({ comic: canon.id, [consts_1.RATHER]: overlay });
    getOption(overCtl, overlay);
    initComic(listImages(overCtl), canon.element, canon.src);
    window.history.replaceState(overlay, document.title, permalink);
    dom.listen(overCtl).on('change', setState(canon.element));
    dom.listen(window).on('popstate', popState(overCtl, canon.element));
    dom.listen(canon.element).on('dblclick', pickState(overCtl, canon.element));
};
exports.hatch = hatchOverlays;

},{"../../consts":4,"../../dom":8,"./urls":16}],15:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hatch = void 0;
const consts_1 = require("../../consts");
const dom = __importStar(require("../../dom"));
const rendering = __importStar(require("../../rendering"));
const onChange = (comic) => (e) => {
    const toggleClass = (checked) => {
        if (checked) {
            comic.classList.remove(consts_1.UNPIXEL);
        }
        else {
            comic.classList.add(consts_1.UNPIXEL);
        }
    };
    rendering.
        set(e.currentTarget.checked).
        then(toggleClass);
};
const hatchRendering = (renderCtl, comic) => {
    dom.
        listen(renderCtl).
        on('change', onChange(comic));
    if (!renderCtl.checked) {
        comic.classList.add(consts_1.UNPIXEL);
    }
};
exports.hatch = hatchRendering;

},{"../../consts":4,"../../dom":8,"../../rendering":29}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.current = void 0;
const consts_1 = require("../../consts");
const getCurrentURL = () => {
    const { href } = window.location;
    return new URL(href);
};
exports.current = getCurrentURL;
const updateURL = (params, from) => {
    const base = from ? new URL(from) : getCurrentURL();
    const PHP = '.php';
    const url = new URL(base.origin);
    url.pathname = base.pathname.endsWith(PHP) ? base.pathname : `index${PHP}`;
    for (const key of [consts_1.ID, consts_1.RATHER]) {
        const val = params[key] ?? base.searchParams.get(key);
        if (val) {
            url.searchParams.set(key, val);
        }
    }
    return url;
};
exports.update = updateURL;

},{"../../consts":4}],17:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hatch = void 0;
const overlays = __importStar(require("./overlays"));
const rendering = __importStar(require("./rendering"));
const hatchView = ([overCtl, renderCtl], canon) => {
    overlays.hatch(canon, overCtl);
    rendering.hatch(renderCtl, canon.element);
};
exports.hatch = hatchView;

},{"./overlays":14,"./rendering":15}],18:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const canon = __importStar(require("./canon"));
const contact = __importStar(require("./contact"));
const hatch = __importStar(require("./hatch"));
const lay = __importStar(require("./lay"));
const rss = __importStar(require("./rss"));
const title = __importStar(require("./title"));
const view = __importStar(require("./view"));
const main = () => {
    const seed = { title, contact, rss, view };
    for (const name of Object.keys(seed)) {
        const egg = {
            seed: seed[name].get,
            lay: lay[name],
            hatch: hatch[name]
        };
        egg.seed(canon).
            then((seeded) => egg.lay(seeded, canon)).
            then((laid) => egg.hatch(laid, canon));
    }
};
main();

},{"./canon":3,"./contact":6,"./hatch":11,"./lay":19,"./rss":31,"./title":33,"./view":35}],19:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./lay"), exports);

},{"./lay":20}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.view = exports.rss = exports.contact = exports.title = void 0;
const nest_1 = require("./nest");
Object.defineProperty(exports, "title", { enumerable: true, get: function () { return nest_1.deposit; } });
Object.defineProperty(exports, "contact", { enumerable: true, get: function () { return nest_1.deposit; } });
const rss_1 = require("./rss");
Object.defineProperty(exports, "rss", { enumerable: true, get: function () { return rss_1.display; } });
const view_1 = require("./view");
Object.defineProperty(exports, "view", { enumerable: true, get: function () { return view_1.display; } });

},{"./nest":21,"./rss":22,"./view":23}],21:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposit = void 0;
const dom = __importStar(require("../dom"));
const createTextSpan = (textContent) => {
    const element = dom.create('span');
    element.textContent = textContent;
    return element;
};
const elementize = (contentVal) => {
    const notStr = (typeof (contentVal) !== 'string');
    return (notStr) ? contentVal : createTextSpan(contentVal);
};
const depositEgg = ({ head, val }) => {
    const row = dom.create('tr', { class: 'egg' }, dom.create('td', { colspan: 3 }, dom.create('div', [dom.create('h2', head), elementize(val)])));
    dom.query('center table tbody').appendChild(row);
};
exports.deposit = depositEgg;

},{"../dom":8}],22:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = void 0;
const dom = __importStar(require("../dom"));
const nest_1 = require("./nest");
const createAnchorLink = (innerHTML) => {
    const a = dom.create('a', { innerHTML, class: 'rss' });
    return a;
};
const displayRss = (seed) => {
    const { head, val: rssTitle } = seed;
    const val = createAnchorLink(rssTitle);
    (0, nest_1.deposit)({ head, val });
    return val;
};
exports.display = displayRss;

},{"../dom":8,"./nest":21}],23:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./view":26,"dup":13}],24:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.control = exports.label = void 0;
const dom = __importStar(require("../../dom"));
const createLabel = () => {
    return dom.create('span', 'Overlay');
};
exports.label = createLabel;
const getPath = (nomSrc) => {
    return nomSrc.includes('.') ? nomSrc : `${nomSrc}.png`;
};
const createOption = (overlay, canonSrc) => {
    const option = dom.create('option', overlay.title);
    option.value = overlay.param ?? '';
    option.dataset.position = overlay.position ?? '0 0';
    option.dataset.src = `/${(overlay.src) ? getPath(overlay.src) : canonSrc}`;
    return option;
};
const groupOverlays = (overlays, groupName, canonSrc) => {
    const options = overlays.
        get(groupName).
        map((over) => createOption(over, canonSrc));
    const optgroup = dom.wrap('optgroup', options);
    optgroup.label = groupName;
    return optgroup;
};
const createControl = (overlays, canonSrc) => {
    const groups = Array.
        from(overlays.keys()).
        map((groupName) => groupOverlays(overlays, groupName, canonSrc));
    const select = dom.wrap('select', groups);
    return select;
};
exports.control = createControl;

},{"../../dom":8}],25:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.control = exports.label = void 0;
const dom = __importStar(require("../../dom"));
const createLabel = () => {
    const label = dom.create('span', 'Pixelated', { class: 'pixel' });
    return label;
};
exports.label = createLabel;
const createControl = (checked) => {
    const control = dom.create('input', { type: 'checkbox', checked });
    return control;
};
exports.control = createControl;

},{"../../dom":8}],26:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = void 0;
const dom = __importStar(require("../../dom"));
const nest_1 = require("../nest");
const overlays = __importStar(require("./overlays"));
const rendering = __importStar(require("./rendering"));
const wrap = (head, spans, controls) => {
    const val = dom.create('div');
    for (let i = 0; i < spans.length; i++) {
        const label = dom.create('label', controls[i], spans[i]);
        val.appendChild(label);
    }
    (0, nest_1.deposit)({ head, val });
};
const display = ({ head, val }, canon) => {
    const [overs, pixelated] = val;
    return Promise.
        all([
        overlays.control(overs, canon.src),
        rendering.control(pixelated),
        overlays.label(),
        rendering.label(),
    ]).
        then((elms) => {
        const [oC, rC, oL, rL,] = elms;
        wrap(head, [oL, rL], [oC, rC]);
        return [oC, rC];
    });
};
exports.display = display;

},{"../../dom":8,"../nest":21,"./overlays":24,"./rendering":25}],27:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./overlays"), exports);

},{"./overlays":28}],28:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const overlays_json_1 = __importDefault(require("../../../anqwtz/app/data/overlays.json"));
const sortViews = (a, b) => {
    if (b.src === '') {
        return 1;
    }
    if (a.src === '' || a.title < b.title) {
        return -1;
    }
    return 1;
};
const sortCategories = (viewList) => {
    return Array.from(viewList.keys()).reduce((sorted, key) => {
        sorted.set(key, viewList.get(key).sort(sortViews));
        return sorted;
    }, new Map());
};
const getShorty = (basic, defaultTitle) => {
    const { param = false, title = defaultTitle } = basic;
    if (param === '') {
        return param;
    }
    return title.toLowerCase().replace(/[^a-z]+/g, '');
};
const expandView = (basic, categories, defaults) => {
    const short = getShorty(basic, defaults.title);
    return [
        {
            title: basic.title ?? defaults.title,
            src: basic.src ?? short,
            param: basic.param ?? short,
            position: basic.position ?? defaults.position
        },
        categories[basic.catID ?? defaults.catID]
    ];
};
const categorizeViews = (vwData) => {
    const mapped = new Map(vwData.categories.map((catName) => [catName, []]));
    vwData.overlays.forEach((basic) => {
        const [view, catName] = expandView(basic, vwData.categories, vwData.defaults);
        mapped.get(catName).push(view);
    });
    return mapped;
};
const getViews = () => {
    return Promise.
        resolve(overlays_json_1.default).
        then(categorizeViews).
        then(sortCategories);
};
exports.get = getViews;

},{"../../../anqwtz/app/data/overlays.json":1}],29:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./rendering"), exports);

},{"./rendering":30}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set = exports.get = void 0;
const KEY = 'rendering';
const getValue = () => {
    const prom = new Promise((resolve) => {
        chrome.storage.local.get([KEY], (value) => {
            resolve(!!(value[KEY] ?? true));
        });
    });
    return prom;
};
exports.get = getValue;
const setValue = (pixelated) => {
    const prom = new Promise((resolve) => {
        chrome.storage.local.set({ [KEY]: pixelated }, () => {
            resolve(pixelated);
        });
    });
    return prom;
};
exports.set = setValue;

},{}],31:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./rss"), exports);

},{"./rss":32}],32:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const consts_1 = require("../consts");
const dom = __importStar(require("../dom"));
const findContent = () => {
    const xPath = '//body//comment()[contains(., \'rss-title\')]';
    const node = dom.eval(xPath);
    return node.data.toString().trim();
};
const getRssTitle = () => {
    const head = 'RSS';
    return Promise.
        resolve(findContent()).
        then((val) => ({ head, val })).
        catch(() => ({ head, val: consts_1.NOT_FOUND }));
};
exports.get = getRssTitle;

},{"../consts":4,"../dom":8}],33:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./title"), exports);

},{"./title":34}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const consts_1 = require("../consts");
const getTitleAttr = (canon) => {
    const head = 'Title';
    return Promise.
        resolve(canon.element.title ?? consts_1.NOT_FOUND).
        then((val) => ({ head, val }));
};
exports.get = getTitleAttr;

},{"../consts":4}],35:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./view":36,"dup":13}],36:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const overlays = __importStar(require("../overlays"));
const rendering = __importStar(require("../rendering"));
function getViewComponents(fn) {
    const defaults = { head: 'View', val: [new Map(), false] };
    return Promise.
        all([overlays.get(), rendering.get()]).
        then((val) => Object.assign({}, defaults, { val })).
        catch(() => Promise.resolve(defaults));
}
exports.get = getViewComponents;
;

},{"../overlays":27,"../rendering":29}]},{},[18]);
