"use strict";

const core = {
    BIWRBR: "butiwouldratherbereading",
    compose: (...funcs) => (value = null) => funcs.reduce((val, fn) => fn(val), value)
}, dom = {
    query: selector => document.querySelector(selector),
    evalAll: xPath => document.evaluate(xPath, document, null, 0),
    eval: xPath => dom.evalAll(xPath).iterateNext(),
    selector: {
        split: selector => `!${selector}`.split(/(?=[\.#])/),
        reduce: (data, comp) => {
            const [key, val] = [ comp.charAt(0), comp.substr(1) ];
            return data[key].push(val), data;
        },
        short: comps => {
            const base = {
                "!": [],
                "#": [],
                ".": []
            };
            return comps.reduce(dom.selector.reduce, base);
        },
        attr: {
            filter: pair => pair[1].length > 0,
            join: pair => [ pair[0], pair[1].join(" ") ],
            extract: short => {
                const {"#": id, ".": classList} = short;
                return [ [ "id", id ], [ "class", classList ] ].filter(dom.selector.attr.filter).map(dom.selector.attr.join);
            }
        },
        expand: short => ({
            name: short["!"].length ? short["!"][0] : "template",
            attrs: dom.selector.attr.extract(short)
        }),
        applyAttrPair: (elem, pair) => (elem.setAttribute(pair[0], pair[1]), elem),
        apply: expanded => expanded.attrs.reduce(dom.selector.applyAttrPair, document.createElement(expanded.name)),
        step: (parsed, step) => step(parsed),
        parse: selector => [ dom.selector.split, dom.selector.short, dom.selector.expand, dom.selector.apply ].reduce(dom.selector.step, selector)
    },
    create: (...selectors) => {
        const elems = [].concat(selectors).map(dom.selector.parse);
        return 1 === selectors.length ? elems[0] : elems;
    },
    appendTo: parent => children => ([].concat(children).map(child => parent.appendChild(child)), 
    parent),
    listen: elem => ({
        on: (eventName, handler) => elem.addEventListener(eventName, handler)
    }),
    row: {
        cell: content => {
            const td = dom.create("td");
            return td.setAttribute("colspan", 3), td.appendChild(content), td;
        },
        create: td => {
            const tr = dom.create("tr.egg");
            return tr.appendChild(td), tr;
        },
        append: row => {
            const parent = dom.query("center tbody");
            return dom.appendTo(parent)(row), row;
        },
        add: content => {
            Promise.resolve(content).then(dom.row.cell).then(dom.row.create).then(dom.row.append);
        }
    }
}, params = {
    defaults: {
        subject: "",
        comic: "",
        [core.BIWRBR]: ""
    },
    shim: {
        getItems: search => search.split("&"),
        getPairs: items => items.map(item => item.split("=")),
        decode: pair => {
            const [name, raw = ""] = pair;
            try {
                return [ name, decodeURIComponent(raw) ];
            } catch (_) {
                return [ name, raw ];
            }
        },
        tidy: pairs => pairs.map(params.shim.decode),
        get: search => Promise.resolve(search).then(params.shim.getItems).then(params.shim.getPairs).then(params.shim.tidy)
    },
    getList: url => {
        const urlObj = new URL(url);
        return "searchParams" in urlObj ? Array.from(urlObj.searchParams.entries()) : params.shim.get(urlObj.search.substr(1));
    },
    reducePair: (obj, pair) => {
        const [name, val = ""] = pair;
        return obj[name] = val, obj;
    },
    reduce: pairs => {
        const initial = Object.assign({}, params.defaults);
        return pairs.reduce(params.reducePair, initial);
    },
    parse: url => Promise.resolve(url).then(params.getList).then(params.reduce),
    join: {
        filter: pairs => pairs.filter(pair => String(pair[1]).length),
        pairs: pairs => pairs.map(pair => pair.join("=")),
        values: vals => vals.join("&"),
        search: (search, path = document.location.pathname) => [ path, search ].filter(str => str).join("?")
    },
    build: pairs => Promise.resolve(pairs).then(params.join.filter).then(params.join.pairs).then(params.join.values)
}, comic = {
    transitionDuration: 800,
    flips: 0,
    element: null,
    onSwap: () => {},
    getElement: node => {
        if (node) return node;
        throw new Error("comic not found");
    },
    getBackgroundImage: elem => elem.style.backgroundImage.replace(/^.+\(['"]*([^\)"']+).+$/, "$1"),
    getOriginal: elem => [ comic.getBackgroundImage(elem), elem.src ].filter(path => path).shift(),
    swap: (char, isHistState) => () => {
        comic.element.src = char.src, comic.onSwap(char, isHistState);
    },
    flip: (char, isHistState = !1) => {
        const swap = comic.swap(char, isHistState), delay = comic.transitionDuration / 2;
        ++comic.flips, comic.element.style.transform = `rotateY(${360 * comic.flips}deg)`, 
        comic.element.style.backgroundPosition = char.pos, window.setTimeout(swap, delay);
    },
    setProperties: elem => {
        const path = comic.getOriginal(elem);
        return comic.element = elem, elem.classList.remove("comic"), elem.style.transitionDuration = `${comic.transitionDuration}ms`, 
        elem.style.backgroundImage = `url(${path})`, path;
    },
    init: () => Promise.resolve("//body/center/table/tbody/tr[1]/td[2]/img").then(dom.eval).then(comic.getElement).then(comic.setProperties)
}, request = {
    rather: (spec, alts) => alts.filter(alt => alt.rather === spec).map(alt => alt.rather).concat("").shift(),
    refine: altChars => sources => {
        const [input, canon] = sources, query = Object.assign({}, input, {
            canon: canon.comic
        });
        return query.rather = request.rather(query[core.BIWRBR], altChars), comic.id = query.comic, 
        query;
    },
    input: () => params.parse(document.location.href),
    canon: () => Promise.resolve('meta[property="og:url"]').then(dom.query).then(elem => elem.content).then(params.parse),
    init: altChars => {
        const refine = request.refine(altChars);
        return Promise.all([ request.input(), request.canon() ]).then(refine);
    }
}, characters = {
    list: [],
    findBaseIndex: (chars, rather) => {
        let found, idx = -1, max = chars.length;
        do {
            found = chars[++idx].rather === rather;
        } while (idx < max && !found);
        return idx % max;
    },
    reindex: (origin, len) => (newList, char, idx) => (newList[(idx + len - origin) % len] = char, 
    newList),
    getIndexer: (chars, rather) => {
        const base = characters.findBaseIndex(chars, rather);
        return characters.reindex(base, chars.length);
    },
    rebase: rather => chars => {
        const reindex = characters.getIndexer(chars, rather);
        return chars.reduce(reindex, Array(chars.length));
    },
    shuffle: (all, char, idx) => {
        const randIdx = Math.floor(Math.random() * (idx + 1));
        return all[idx] = all[randIdx], all[randIdx] = char, all;
    },
    randomize: chars => {
        const first = [ chars.shift() ], shuffled = chars.reduceRight(characters.shuffle, chars);
        return characters.list = first.concat(shuffled).map((char, idx) => Object.assign({
            idx: idx
        }, char)), characters.list;
    },
    getNext: currentSrc => {
        let isCurrent = !1, idx = 0, max = characters.list.length;
        for (;!isCurrent && idx < max; ) isCurrent = currentSrc.endsWith(characters.list[idx].src), 
        ++idx;
        return characters.list[idx % max];
    },
    init: (altChars, original, rather) => {
        const rebase = characters.rebase(rather);
        return Promise.resolve([ original ].concat(altChars)).then(rebase).then(characters.randomize);
    }
}, nest = {
    dud: () => "<em>Friiiiig.</em>",
    egg: egg => Promise.resolve().then(egg.select).then(egg.develop).catch(nest.dud).then(egg.hatch),
    lay: async comps => {
        const shell = dom.create("div"), append = dom.appendTo(shell);
        await Promise.resolve(comps).then(append).then(dom.row.add);
    },
    deposit: eggs => eggs.map(nest.lay),
    init: eggs => {
        const clutch = eggs.map(nest.egg);
        return Promise.all(clutch).then(nest.deposit);
    }
}, flip = {
    flop: () => {
        const next = characters.getNext(comic.element.src);
        comic.flip(next);
    },
    init: () => dom.listen(comic.element).on("dblclick", flip.flop)
}, links = {
    perma: null,
    prev: null,
    next: null,
    getSearch: (comicId, rather) => Promise.resolve([ [ "comic", comicId ], [ core.BIWRBR, rather ] ]).then(params.build),
    setHref: elem => url => (elem.href = url, url),
    apply: (elem, location, comicId, char) => {
        const path = location.pathname, setHref = links.setHref(elem);
        return links.getSearch(comicId, char.rather).then(search => params.join.search(search, path)).then(setHref);
    },
    main: (elem, char) => {
        const {location: location} = document;
        return links.apply(elem, location, comic.id, char);
    },
    nav: (elem, query, char) => {
        const location = new URL(elem.href);
        return links.apply(elem, location, query.comic, char);
    },
    setHistory: char => url => {
        window.history.pushState(char, document.title, url);
    },
    resolve: resolved => {
        const [prev, next, char, isHistState, elem = links.perma] = resolved, mainThen = isHistState ? () => {} : links.setHistory(char);
        return links.nav(links.prev, prev, char), links.nav(links.next, next, char), links.main(links.perma, char).then(mainThen), 
        elem;
    },
    update: (char, isHistState = !1) => Promise.all([ params.parse(links.prev.href), params.parse(links.next.href), char, isHistState ]).then(links.resolve),
    assign: elem => (links.perma = elem, elem),
    init: () => (links.perma = dom.create("a.permalink"), links.perma.textContent = "(permalink)", 
    links.prev = dom.eval("//body/center/table/tbody/tr[1]/td[1]/div/a"), links.next = dom.eval("//body/center/table/tbody/tr[1]/td[3]/div/a"), 
    links.update(characters.list[0]))
}, dropdown = {
    element: null,
    sortChar: (sorted, char) => (sorted[char.sort] = char, sorted),
    appendChild: (parent, child) => (parent.append(child), parent),
    option: (char, rather) => {
        const opt = dom.create("option");
        return opt.value = char.idx, opt.textContent = char.desc, opt.dataset.src = char.src, 
        opt.selected = char.rather === rather, opt;
    },
    reduceChars: rather => (group, char) => {
        const opt = dropdown.option(char, rather);
        return dropdown.appendChild(group, opt);
    },
    optgroup: (chars, rather) => {
        const group = dom.create("optgroup"), reduceChars = dropdown.reduceChars(rather);
        return group.label = "...but I would rather be reading:", chars.reduce(reduceChars, group);
    },
    getChildren: (chars, rather) => {
        const len = chars, sorted = chars.reduce(dropdown.sortChar, Array(len));
        return [ dropdown.option(sorted[0], rather), dropdown.optgroup(sorted.slice(1), rather) ];
    },
    populate: rather => select => dropdown.getChildren(characters.list, rather).reduce(dropdown.appendChild, select),
    getCharacter: val => {
        const idx = Number(val);
        return characters.list[idx];
    },
    change: event => {
        const char = dropdown.getCharacter(event.target.value);
        event.preventDefault(), comic.flip(char);
    },
    register: elem => (dom.listen(elem).on("change", dropdown.change), elem),
    assign: elem => (dropdown.element = elem, elem),
    update: charIdx => {
        console.log("dropdown.update");
        for (let opt of Array.from(dropdown.element.options)) if (console.log(opt.value, charIdx), 
        console.log(opt), Number(opt.value) === charIdx) return void (opt.selected = !0);
    },
    init: rather => {
        const populate = dropdown.populate(rather);
        return Promise.resolve("select").then(dom.create).then(populate).then(dropdown.register).then(dropdown.assign);
    }
}, ui = {
    update: (char, isHistState) => {
        links.update(char, isHistState), dropdown.update(char.idx);
    },
    onPop: event => {
        event.state && comic.flip(event.state, !0);
    },
    register: () => {
        comic.onSwap = ui.update, window.onpopstate = ui.onPop;
    },
    wrapLinks: elems => {
        const div = dom.create("div");
        return dom.appendTo(div)(elems);
    },
    resolve: resolved => {
        const elems = resolved.slice(2);
        return Promise.resolve(elems).then(ui.wrapLinks).then(dom.row.add);
    },
    init: query => Promise.all([ ui.register(), flip.init(), links.init(), dropdown.init(query.rather) ]).then(ui.resolve)
}, generate = {
    header: text => {
        const head = dom.create("h2");
        return head.textContent = text, head.style.color = "#222", head.style.textTransform = "none", 
        head;
    },
    anchor: href => dom.query("#blogpost center > a").setAttribute("name", href.substr(1)),
    getPost: () => document.getElementById("blogpost"),
    scroll: () => {
        generate.getPost().classList.add("angola");
    },
    transitionEnd: () => {
        generate.getPost().classList.remove("angola");
    },
    monkey: () => {
        const post = generate.getPost(), pad = document.documentElement.clientHeight - 200;
        post.addEventListener("transitionend", generate.transitionEnd), dom.query("#container").style.minHeight = pad + "px";
    },
    rss: (name, value) => {
        const href = "#angola-maldives", head = generate.header(name), content = dom.create("a");
        return content.innerHTML = value, content.setAttribute("href", href), content.addEventListener("click", generate.scroll), 
        generate.anchor(href), generate.monkey(), [ head, content ];
    },
    basic: name => value => {
        const head = generate.header(name), content = dom.create("div");
        return content.innerHTML = value, [ head, content ];
    }
}, config = {
    eggs: () => Promise.resolve([ {
        hatch: generate.basic("Title"),
        select: () => comic.element,
        develop: elem => {
            const original = elem.getAttribute("title");
            return elem.setAttribute("title", "DOUBLE CLICK FOR MORE AWESOME FUN TIMES!"), original;
        }
    }, {
        hatch: generate.basic("Contact"),
        select: () => dom.query(".topnav a[href^=mailto]"),
        develop: elem => Promise.resolve(elem.getAttribute("href")).then(params.parse).then(params => params.subject)
    }, {
        hatch: value => generate.rss("RSS", value),
        select: () => {
            return dom.eval("//body//comment()[contains(., 'rss-title')]");
        },
        develop: elem => elem.data.trim()
    } ]),
    characters: {
        src: nominal => nominal.split(".png")[0] + ".png",
        rather: desc => desc.replace(/[^a-z]/gi, "").toLowerCase(),
        alt: label => ({
            rather: config.characters.rather(label),
            desc: label
        }),
        default: () => ({
            rather: "",
            desc: "Standard View"
        }),
        create: (nomSrc, label = "", pos = "0 0", sort = 0) => new Promise(resolve => {
            const src = config.characters.src(nomSrc), method = label ? "alt" : "default";
            resolve(Object.assign({
                src: src,
                pos: pos,
                sort: sort
            }, config.characters[method](label)));
        }),
        generate: alts => Promise.all(alts.map((alt, idx) => {
            const [nomSrc, label, pos = "0 0"] = alt;
            return config.characters.create(nomSrc, label, pos, idx + 1);
        }))
    },
    alts: () => config.characters.generate([ [ "assimilated", "One Where T-Rex Got Assimilated" ], [ "clothes", "One Where T-Rex Wears More" ], [ "frig", "One Where T-Rex Swears More" ], [ "feathers", "Something More Historically Accurate" ], [ "lastever", "The Last Dinosaur Comic Ever" ], [ "penny", "Penny Arcade", "7px 8px" ], [ "problemsleuth", "Problem Sleuth" ], [ "xkcd", "XKCD" ] ])
}, init = {
    config: () => Promise.all([ comic.init(), config.alts(), config.eggs() ]),
    basic: resolved => {
        const [comicPath, altChars, eggs] = resolved;
        return Promise.all([ altChars, config.characters.create(comicPath), request.init(altChars), nest.init(eggs) ]);
    },
    characters: resolved => {
        const [altChars, original, query] = resolved;
        return Promise.all([ query, characters.init(altChars, original, query.rather) ]);
    },
    interface: resolved => ui.init(resolved[0]),
    onError: e => {
        console.group("Angola Maldives: Exception"), console.log(e), console.groupEnd();
    },
    all: () => Promise.resolve(null).then(init.config).then(init.basic).then(init.characters).then(init.interface).catch(init.onError)
};

init.all();