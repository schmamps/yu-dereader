(function () {
    'use strict';

    const isType = (typeStr) => (val) => typeof (val) === typeStr;
    const isString = isType('string');
    const isObject = isType('object');
    const isElement = (val) => val?.tagName ?? false;
    const isChild = (val) => isObject(val) && isElement(val);
    const isPropList = (val) => isObject(val) && !isElement(val);

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
        const children = flat.filter(isChild);
        const prop = flat.
            filter(isPropList).
            reduce((all, one) => Object.assign(all, one), {});
        const html = flat.filter(isString).join(' ') ||
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
    const evalAll = (xPath) => {
        return document.evaluate(xPath, document, null, 0);
    };
    const evalOne = (xPath) => {
        const all = evalAll(xPath);
        return all.iterateNext() ?? null;
    };
    const listen = (context) => {
        const on = (eventName, handler) => {
            context.addEventListener(eventName, handler);
        };
        return { on };
    };
    const query = (sel, context = document) => {
        return context.querySelector(sel);
    };
    const meta = (property) => {
        return query(`meta[property="${property}"]`);
    };
    const values = (sel) => {
        return Array.
            from(sel.options).
            map((opt) => opt.value ?? '');
    };
    const depositEgg = (head, content) => {
        const parent = query('center table tbody');
        if (!parent)
            return;
        const row = create('tr', { class: 'egg' });
        const td = create('td', { colspan: '3' });
        const div = create('div', { textContent: head });
        const h2 = create('h2');
        div.appendChild(h2);
        div.appendChild(content);
        td.appendChild(div);
        row.appendChild(td);
        parent.appendChild(row);
    };

    const hatchContact = async (span) => {
        depositEgg('Contact', span);
    };

    const hatchHiDPI = async (style) => {
        query('head')?.appendChild(style);
    };

    const NOT_FOUND = '(not found)';
    const RATHER = 'butiwouldratherbereading';
    const TRANS_DURATION = 800;
    const ID = 'comic';

    const getCurrentURL = () => {
        const { href } = window.location;
        return new URL(href);
    };
    const updateURL = (params, from) => {
        const base = from ? new URL(from) : getCurrentURL();
        const PHP = '.php';
        const url = new URL(base.origin);
        url.pathname = base.pathname.endsWith(PHP) ? base.pathname : `index${PHP}`;
        for (const key of [ID, RATHER]) {
            const val = params[key] || base.searchParams.get(key);
            if (val) {
                url.searchParams.set(key, val);
            }
        }
        return url;
    };

    const getEffectiveOverlay = (validOverlays, spec) => {
        if (validOverlays.includes(spec)) {
            return spec;
        }
        return '';
    };
    const updateComic = (comic, src, pos) => {
        const rotY = Number(comic.style.transform.replace(/\D/g, ''));
        const setImage = () => { comic.src = src; };
        window.setTimeout(setImage, TRANS_DURATION / 2);
        comic.style.transform = `rotateY(${((rotY + 360) % 720)}deg)`;
        comic.style.backgroundPosition = pos;
    };
    const pushState = (comic, target) => {
        const update = { [RATHER]: target.selectedOptions[0].value };
        const { src = '', position = '' } = target.selectedOptions[0].dataset;
        for (const arrow of ['left', 'right']) {
            try {
                const selector = `td[align=${arrow}] .nohover a`;
                const a = query(selector);
                a.href = updateURL(update, a.href);
            }
            catch (_) {
                const prob = (arrow === 'left') ? ' not' : '';
                console.info(`Error updating ${arrow} arrow link.
This is (probably${prob}) fine!`);
            }
        }
        window.history.pushState(update[RATHER], document.title, updateURL(update));
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
        const idx = Math.max(0, values(overCtl).indexOf(val.toString()));
        overCtl.selectedIndex = idx;
        return overCtl.selectedOptions[0];
    };
    const popState = (overCtl, comic) => (e) => {
        const { src = '', position = '' } = getOption(overCtl, e.state.toString()).dataset;
        updateComic(comic, src, position);
    };
    async function initComic(images, comic, src) {
        const rel = 'prefetch';
        for (const href of images) {
            const link = create('link', { rel, href });
            document.head.appendChild(link);
        }
        comic.style.backgroundImage = `url(${src})`;
        comic.style.transition = [
            `transform ${TRANS_DURATION}ms`,
            `background-position 0ms ease ${TRANS_DURATION / 2}ms`
        ].join(', ');
    }
    const listImages = (overCtl) => {
        return Array.
            from(overCtl.options).
            slice(1).
            map((opt) => opt.dataset.src);
    };
    const hatchOverlays = (control, canon) => {
        const overlay = getEffectiveOverlay(values(control), getCurrentURL().searchParams.get(RATHER) ?? '');
        const comic = canon.id.toString();
        const permalink = updateURL({ comic, [RATHER]: overlay });
        getOption(control, overlay);
        initComic(listImages(control), canon.element, canon.src);
        window.history.replaceState(overlay, document.title, permalink);
        listen(control).on('change', setState(canon.element));
        listen(window).on('popstate', popState(control, canon.element));
        listen(canon.element).on('dblclick', pickState(control, canon.element));
    };

    const createPostAnchor = (name) => {
        const anchor = create('a', { name });
        const header = query('#blogpostheader');
        if (header)
            header.appendChild(anchor);
    };
    const padContainer = () => {
        const cont = query('div#container') ?? false;
        if (cont === false)
            return;
        const footHt = cont?.nextElementSibling?.getBoundingClientRect().height ?? false;
        if (footHt === false)
            return;
        const fullHt = query('html')?.getBoundingClientRect().height ?? false;
        if (fullHt === false)
            return;
        const mHt = Math.max(cont?.getBoundingClientRect().height ?? 0, fullHt - footHt);
        cont.style.minHeight = `${mHt}px`;
    };
    const getBlogAnchor = (hash) => {
        const name = hash.substring(1);
        return query(`a[name=${name}]`);
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
    const hatchRSS = async (link) => {
        const ANCHORNAME = 'yu-dereader';
        padContainer();
        createPostAnchor(ANCHORNAME);
        link.setAttribute('href', `#${ANCHORNAME}`);
        listen(link).on('click', onClick);
        depositEgg('RSS', link);
    };

    const hatchTitle = async (span) => {
        depositEgg('Title', span);
    };

    const displayContact = async (msg) => {
        const span = create('span', { textContent: msg, class: 'contact' });
        return span;
    };

    const pixelate = (hidpi) => {
        if (!hidpi)
            return '';
        return `
tr > td:nth-child(2) > img {
	image-rendering: pixelated
}
	`.trim();
    };
    const generateStyle = async (hidpi) => {
        const style = create('style', { textContent: pixelate(hidpi) });
        return style;
    };

    const getPath = (nomSrc) => {
        return nomSrc.includes('.') ? nomSrc : `${nomSrc}.png`;
    };
    const createOption = (overlay, canonSrc) => {
        const option = create('option', overlay.title);
        option.value = overlay.param ?? '';
        option.dataset.position = overlay.position ?? '0 0';
        option.dataset.src = `/${(overlay.src) ? getPath(overlay.src) : canonSrc}`;
        return option;
    };
    const groupOverlays = (overlays, groupName, canonSrc) => {
        const options = overlays.get(groupName) ?? [];
        const optionElms = options.map((over) => createOption(over, canonSrc));
        const optgroup = optionElms.reduce((group, option) => {
            group.appendChild(option);
            return group;
        }, create('optgroup'));
        optgroup.label = groupName;
        return optgroup;
    };
    const displayControl = (overlays, canonSrc) => {
        const groups = (Array.from(overlays.keys()) ?? []).map((groupName) => groupOverlays(overlays, groupName, canonSrc));
        const select = groups.reduce((ctrl, group) => {
            ctrl.appendChild(group);
            return ctrl;
        }, create('select'));
        return select;
    };

    const createAnchorLink = (innerHTML) => {
        const link = create('a', { innerHTML, class: 'rss' });
        return link;
    };
    const displayRss = async (rssTitle) => {
        const link = createAnchorLink(rssTitle);
        return link;
    };

    const displayTitle = async (comicTitle) => {
        const span = create('span', { textContent: comicTitle, class: 'title' });
        return span;
    };

    const getSrc = () => {
        const elm = meta('og:image');
        if (!elm) {
            throw new Error('error getting canonical image');
        }
        return elm.content.replace(/^http.+(comics.+)$/, '$1');
    };
    const getCanonURL = () => {
        const elm = meta('og:url');
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
            throw e;
        }
    };
    const getElement = () => {
        const found = query([
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
    const getCanon = () => {
        const [id, src, element] = [
            getId(),
            getSrc(),
            getElement()
        ];
        return { id, src, element };
    };

    const getSubjectHref = async () => {
        const href = (query('.topnav a[href^=mailto]')?.getAttribute('href')) ?? '';
        return href;
    };
    const getContactSubject = async () => {
        const subject = getSubjectHref().
            then((href) => new URL(href).searchParams.get('subject') ?? NOT_FOUND).
            catch(() => NOT_FOUND);
        return subject;
    };

    const getHiDPI = async () => {
        const hidpi = (window.devicePixelRatio > 1);
        return hidpi;
    };

    var categories = [
    	"T-Rex and Pals",
    	"Other Friends"
    ];
    var defaults = {
    	title: "",
    	src: "",
    	param: "",
    	position: "0 0",
    	category: "",
    	catID: 0
    };
    var overlays = [
    	{
    		title: "The Canonical Cartoon",
    		src: "",
    		param: ""
    	},
    	{
    		title: "One Where T-Rex Got Assimilated",
    		src: "assimilated"
    	},
    	{
    		title: "One Where T-Rex Wears More",
    		src: "clothes"
    	},
    	{
    		title: "One Where T-Rex Swears More",
    		src: "frig"
    	},
    	{
    		title: "Something More Historically Accurate",
    		src: "feathers"
    	},
    	{
    		title: "The Last Dinosaur Comic Ever",
    		src: "lastever"
    	},
    	{
    		title: "Before the Special Effects Are Added"
    	},
    	{
    		title: "One Done in Watercolours",
    		src: "watercolours"
    	},
    	{
    		title: "D.C. Comics",
    		src: "batman"
    	},
    	{
    		title: "Just About T-Rex",
    		src: "moretrex"
    	},
    	{
    		title: "About Pirates",
    		src: "pirates"
    	},
    	{
    		title: "Dr. McNinja",
    		src: "mcninja"
    	},
    	{
    		title: "Penny Arcade",
    		src: "penny",
    		position: "7px 8px",
    		catID: 1
    	},
    	{
    		title: "Problem Sleuth",
    		catID: 1
    	},
    	{
    		title: "XKCD",
    		catID: 1
    	},
    	{
    		title: "Sweet Bro and Hella Jeff",
    		src: "sbahj",
    		catID: 1
    	},
    	{
    		title: "A Lesson Is Learned But the Damage Is Irreversible",
    		src: "alil",
    		catID: 1
    	},
    	{
    		title: "BRODYQUEST",
    		src: "brodyquest.gif",
    		catID: 1
    	},
    	{
    		title: "Buttercup Festival",
    		catID: 1
    	},
    	{
    		title: "Daisy Owl",
    		catID: 1
    	},
    	{
    		title: "Nedroid",
    		catID: 1
    	},
    	{
    		title: "Pokey the Penguin",
    		src: "pokey",
    		param: "pokey",
    		catID: 1
    	},
    	{
    		title: "Shortpacked!",
    		catID: 1
    	},
    	{
    		title: "Wigu Adventures",
    		src: "wigu",
    		param: "wigu",
    		catID: 1
    	},
    	{
    		title: "Wondermark",
    		catID: 1
    	},
    	{
    		title: "Achewood",
    		position: "0 30px",
    		catID: 1
    	},
    	{
    		title: "Registered Weapon",
    		catID: 1
    	},
    	{
    		title: "Sister Claire",
    		catID: 1
    	},
    	{
    		title: "The RIAA Version of the Internet",
    		src: "censored.gif",
    		param: "theRIAAversionoftheinternet",
    		catID: 1
    	}
    ];
    var OVERLAYS = {
    	categories: categories,
    	defaults: defaults,
    	overlays: overlays
    };

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
            sorted.set(key, viewList.get(key)?.sort(sortViews));
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
                position: basic.position ?? defaults.position,
            },
            categories[basic.catID ?? defaults.catID]
        ];
    };
    const categorizeViews = (vwData) => {
        const mapped = new Map(vwData.categories.map((catName) => [catName, []]));
        vwData.overlays.forEach((basic) => {
            const [view, catName] = expandView(basic, vwData.categories, vwData.defaults);
            mapped.get(catName)?.push(view);
        });
        return mapped;
    };
    const listViews = () => {
        const overlays = OVERLAYS;
        return Promise.
            resolve(overlays).
            then(categorizeViews).
            then(sortCategories);
    };
    const getOverlays = async () => {
        const overlays = listViews().catch(() => new Map());
        return overlays;
    };

    const findContent = () => {
        const xPath = '//body//comment()[contains(., \'rss-title\')]';
        const node = evalOne(xPath);
        return node.data.toString().trim();
    };
    const getRssTitle = () => {
        const rssTitle = Promise.resolve(findContent()).catch(() => NOT_FOUND);
        return rssTitle;
    };

    const getTitleAttr = async (canon) => {
        const title = canon.element.title;
        return title;
    };

    const main = () => {
        const canon = getCanon();
        const err = (category) => {
            return (e) => {
                console.group('Yu Dereader Error');
                console.log(`error in category '${category}'`);
                console.dir(e);
                console.dir(canon);
                console.groupEnd();
            };
        };
        console.dir(canon);
        getHiDPI().
            then(generateStyle).
            then(hatchHiDPI).
            catch(err('HiDPI'));
        getTitleAttr(canon).
            then(displayTitle).
            then(hatchTitle).
            catch(err('Title'));
        getContactSubject().
            then(displayContact).
            then(hatchContact).
            catch(err('Contact'));
        getRssTitle().
            then(displayRss).
            then(hatchRSS).
            catch(err('RSS'));
        getOverlays().
            then((overlays) => displayControl(overlays, canon.src)).
            then((control) => hatchOverlays(control, canon)).
            catch(err('Overlays'));
    };
    main();

})();
