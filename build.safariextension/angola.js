(() => {
    "use strict";
    const select = {
        Title: comic => comic,
        Contact: () => document.querySelector(".topnav a[href^=mailto]"),
        RSS: () => {
            return document.evaluate("//body//comment()[contains(., 'rss-title')]", document, null, 0).iterateNext();
        },
        Message: () => Array.from(document.querySelectorAll("#blogpost .rss-content")).filter(elem => elem.textContent.length > 0).pop()
    }, process = {
        Title: elem => elem.getAttribute("title"),
        Contact: elem => {
            const re = /^.*subject=/, subject = elem.getAttribute("href").replace(re, "");
            try {
                return decodeURIComponent(subject);
            } catch (e) {
                return subject;
            }
        },
        RSS: elem => elem.data.trim(),
        Message: elem => elem.innerHTML
    }, flip = {
        duration: 1e3,
        getBackground: comic => {
            const re = /^.+['"](.+)['"].*$/;
            return comic.style.backgroundImage.replace(re, "$1");
        },
        setBackground: comic => next => {
            const prev = flip.getBackground(comic);
            return comic.style.backgroundImage = `url('${next}')`, prev;
        },
        setImageSrc: comic => src => comic.setAttribute("src", src),
        swap: comic => () => {
            Promise.resolve(comic.getAttribute("src")).then(flip.setBackground(comic)).then(flip.setImageSrc(comic));
        },
        flop: comic => () => {
            comic.style.transitionDuration = flip.duration + "ms", comic.classList.toggle("lastEver"), 
            window.setTimeout(flip.swap(comic), .5 * flip.duration);
        },
        init: comic => {
            flip.setBackground(comic)("lastever.png"), comic.addEventListener("dblclick", flip.flop(comic));
        }
    }, render = {
        nest: () => {
            const tbody = document.querySelector("center tbody"), tr = document.createElement("tr");
            tr.innerHTML = '<td/><td><ul class="clutch"/><td/>', tbody.appendChild(tr);
        },
        stub: tagSet => {
            const [tagName, value] = tagSet, elem = document.createElement(tagName);
            return elem["div" === tagName ? "innerHTML" : "textContent"] = value.toString(), 
            elem;
        },
        egg: name => value => {
            const tagSets = [ [ "strong", name ], [ "div", value ] ], li = document.createElement("li"), clutch = document.querySelector("ul.clutch");
            tagSets.map(render.stub).map(elem => li.appendChild(elem)), clutch.appendChild(li);
        },
        field: comic => name => {
            const seed = select[name], develop = process[name], hatch = render.egg(name);
            Promise.resolve(seed(comic)).then(develop).then(hatch).catch(() => hatch("<em>dud!</em>"));
        },
        eggs: comic => {
            const fields = [ "Title", "Contact", "RSS", "Message" ], mapFields = render.field(comic);
            fields.map(mapFields);
        },
        init: comic => {
            render.nest(), render.eggs(comic), flip.init(comic);
        }
    }, comic = (() => {
        const elem = document.querySelector("img.comic");
        return elem || !1;
    })();
    !!comic && render.init(comic);
})();