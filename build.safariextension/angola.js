(() => {
    "use strict";
    const compose = (...funcs) => value => funcs.reduce((val, fn) => fn(val), value), params = {
        cache: {},
        addPairToParams: (params, pair) => {
            const [name, val = ""] = pair;
            return params[name] = val, params;
        },
        native: location => Array.from(new URL(location).searchParams.entries()),
        splitSearch: search => search.substr(1).split("&"),
        splitItem: item => item.split("="),
        splitItems: items => items.map(params.splitItem),
        shim: location => compose(params.splitSearch, params.splitItems)(location.search),
        init: () => {
            const loc = document.location, pairs = window.URL ? params.native(loc) : params.shim(loc);
            params.cache = pairs.reduce(params.addPairToParams, {});
        },
        get: (name, defaultValue) => name in params.cache ? params.cache[name] : defaultValue
    }, select = {
        Title: elem => elem,
        Contact: () => document.querySelector(".topnav a[href^=mailto]"),
        RSS: () => {
            return document.evaluate("//body//comment()[contains(., 'rss-title')]", document, null, 0).iterateNext();
        }
    }, process = {
        Title: elem => {
            const original = elem.getAttribute("title"), next = "DOUBLE CLICK FOR MORE AWESOME FUN TIMES!";
            return elem.setAttribute("title", next), elem.dataset.title = next, original;
        },
        Contact: elem => {
            const re = /^.*subject=/, subject = elem.getAttribute("href").replace(re, "");
            try {
                return decodeURIComponent(subject);
            } catch (e) {
                return subject;
            }
        },
        RSS: elem => elem.data.trim()
    }, generate = {
        getChildren: (...all) => [].concat(document.createElement("li")).concat(all.map(name => document.createElement(name))),
        appendTo: parent => children => ([].concat(children).map(child => parent.appendChild(child)), 
        parent),
        listItem: (li, ...children) => {
            const ul = document.querySelector(".clutch ul"), appendSubs = generate.appendTo(li), appendItem = generate.appendTo(ul);
            Promise.resolve(appendSubs(children)).then(appendItem);
        },
        basic: name => value => {
            const [li, strong, div] = generate.getChildren("strong", "div");
            strong.textContent = name, div.innerHTML = value, generate.listItem(li, strong, div);
        },
        anchor: name => document.querySelector("#blogpost center > a").setAttribute("name", name),
        getPost: () => document.getElementById("blogpost"),
        scroll: () => generate.getPost().classList.add("angola"),
        transitionEnd: () => generate.getPost().classList.remove("angola"),
        monkey: () => {
            const post = generate.getPost(), pad = document.documentElement.clientHeight - 200;
            post.addEventListener("transitionend", generate.transitionEnd), document.getElementById("container").style.minHeight = pad + "px";
        }
    };
    generate.Title = generate.basic("Title"), generate.Contact = generate.basic("Contact"), 
    generate.RSS = (value => {
        const href = "#angola-maldives", [li, strong, a] = generate.getChildren("strong", "a");
        strong.textContent = "RSS", a.innerHTML = value, a.setAttribute("href", href), a.addEventListener("click", generate.scroll), 
        generate.listItem(li, strong, a), generate.anchor(href.substr(1)), generate.monkey();
    });
    const flip = {
        duration: 800,
        chars: [],
        getRotation: decl => Number(decl.replace(/[^\d]/g, "")),
        getNext: angle => {
            const idx = angle % (360 * flip.chars.length) / 360, [src, title, position = "0 0"] = flip.chars[idx];
            return {
                src: src,
                title: title,
                position: position,
                angle: angle
            };
        },
        reduceParam: (search, param) => {
            const delim = search.length ? "&" : "?", [name, val] = param;
            return search + `${delim}${name}=${val}`;
        },
        formatLink: title => {
            const query = [ [ "comic", params.get("comic", !1) ], [ "butiwouldratherbereading", title ] ].filter(param => param[1]).reduce(flip.reduceParam, "");
            return document.location.pathname + query;
        },
        link: title => {
            const plink = document.querySelector(".clutch a.permalink"), href = flip.formatLink(title);
            plink.setAttribute("href", href);
        },
        swap: (img, next) => () => {
            img.setAttribute("src", next.src), flip.link(next.title);
        },
        onload: (elem, next) => () => {
            const swap = flip.swap(elem, next), timeout = flip.duration / 2;
            elem.style.transform = `rotateY(${next.angle}deg)`, elem.style.backgroundPosition = next.position, 
            window.setTimeout(swap, timeout);
        },
        preload: (next, elem) => {
            const img = document.createElement("img");
            img.addEventListener("load", flip.onload(elem, next)), img.setAttribute("src", next.src);
        },
        flop: event => {
            event.preventDefault();
            const elem = event.currentTarget, angle = flip.getRotation(elem.style.transform) + 360, next = flip.getNext(angle);
            flip.preload(next, elem);
        },
        getBackground: elem => {
            const decl = elem.style.backgroundImage;
            return decl ? decl.replace(/^.+[\('"]+([^\)"']+).+$/, "$1") : "";
        },
        getImages: elem => {
            const current = elem.getAttribute("src"), bg = flip.getBackground(elem);
            return bg ? [ bg, current ] : [ current, current ];
        },
        findBaseIndex: (chars, base) => {
            for (let i in chars) if (chars[i][0] === base) return i;
            return 0;
        },
        reindex: (chars, inc, mod) => (indexed, _, idx) => indexed.concat([ chars[(idx + inc) % mod] ]),
        rebase: base => chars => {
            const inc = flip.findBaseIndex(chars, base), len = chars.length;
            return chars.reduce(flip.reindex(chars, inc, len), []);
        },
        shuffle: chars => {
            for (let currIdx = chars.length - 1; currIdx > 0; --currIdx) {
                const randIdx = 1 + Math.floor(Math.random() * currIdx), temp = chars[currIdx];
                chars[currIdx] = chars[randIdx], chars[randIdx] = temp;
            }
            return chars;
        },
        initChars: (current, original) => compose(flip.rebase(current), flip.shuffle)([ [ original, "" ], [ "assimilated.png", "onewheretrexgotassimilated" ], [ "clothes.png", "onewheretrexwearsmore" ], [ "feathers.png", "somethingmorehistoricallyaccurate" ], [ "frig.png", "onewheretrexswearsmore" ], [ "lastever.png", "thelastdinosaurcomicever" ], [ "penny.png", "pennyarcade", "7px 8px" ], [ "problemsleuth.png", "problemsleuth" ], [ "xkcd.png", "xkcd" ] ]),
        initComic: (elem, original) => {
            elem.classList.remove("comic"), elem.style.transform = "rotateY(0deg)", elem.style.transitionDuration = `${flip.duration}ms`, 
            elem.style.backgroundImage = `url(${original})`, elem.addEventListener("dblclick", flip.flop);
        },
        init: elem => {
            const [original, current] = flip.getImages(elem);
            flip.chars = flip.initChars(current, original), flip.initComic(elem, original);
        }
    }, nest = {
        emptyCell: () => document.createElement("td"),
        link: () => {
            const a = document.createElement("a");
            return a.className = "permalink", a.textContent = "(permalink)", a.setAttribute("href", window.location.href), 
            a;
        },
        clutch: () => document.createElement("ul"),
        clutchCell: () => {
            const td = nest.emptyCell();
            return td.className = "clutch", td.appendChild(nest.link()), td.appendChild(nest.clutch()), 
            td;
        },
        row: () => {
            const tr = document.createElement("tr");
            return tr.appendChild(nest.emptyCell()), tr.appendChild(nest.clutchCell()), tr.appendChild(nest.emptyCell()), 
            tr;
        },
        build: () => {
            const tbody = document.querySelector("center tbody"), row = nest.row();
            tbody.appendChild(row);
        },
        stub: tagSet => {
            const [tagName, value] = tagSet, elem = document.createElement(tagName);
            return elem["div" === tagName ? "innerHTML" : "textContent"] = value.toString(), 
            elem;
        },
        egg: elem => name => {
            Promise.resolve(select[name](elem)).then(process[name]).then(generate[name]).catch(() => generate[name]("<em>Friiiiig.</em>"));
        },
        eggs: elem => {
            const eggs = [ "Title", "Contact", "RSS" ], mapFields = nest.egg(elem);
            eggs.map(mapFields);
        },
        init: elem => {
            nest.build(), nest.eggs(elem);
        }
    }, comic = (() => {
        const elem = document.querySelector("center > table tr > td:nth-child(2) > img");
        return elem || !1;
    })();
    !!comic && (comic => {
        params.init(), nest.init(comic), flip.init(comic);
    })(comic);
})();