!function() {
    "use strict";
    const select = {
        Title: comic => comic,
        Contact: () => document.querySelector(".topnav a[href^=mailto]"),
        RSS: () => {
            return document.evaluate("//body//comment()[contains(., 'rss-title')]", document, null, 0).iterateNext();
        },
        Message: () => Array.from(document.querySelectorAll("#blogpost .rss-content")).filter(elem => elem.textContent.length > 0).pop()
    }, filter = {
        Title: elem => elem.getAttribute("title"),
        Contact: elem => {
            const re = /^.*subject=/, subject = elem.getAttribute("href").replace(re, "");
            try {
                return decodeURIComponent(subject);
            } catch (e) {
                return subject;
            }
        },
        RSS: elem => elem.data,
        Message: elem => elem.innerHTML
    }, render = {
        nest: width => {
            const template = document.createElement("template"), tbody = document.querySelector("center tbody");
            template.innerHTML = `\n<tr>\n\t<td colspan="3">\n\t\t<ul class="clutch"/>\n\t</td>\n</tr>\n<style>\nul.clutch { margin:0 auto; max-width:735px; }\nul.clutch li { padding-bottom: .25em; }\nul.clutch strong { display:block; }\nul.clutch div { margin-left: 2em; }\n</style>\n`, 
            Array.from(template.content.children).map(child => {
                tbody.appendChild(child);
            });
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
            const seed = select[name], develop = filter[name], hatch = render.egg(name);
            Promise.resolve(seed(comic)).then(develop).then(hatch).catch(() => hatch("<em>dud!</em>"));
        },
        eggs: comic => {
            const fields = [ "Title", "Contact", "RSS", "Message" ], mapFields = render.field(comic);
            render.nest(), fields.map(mapFields);
        }
    };
    (() => {
        const comic = document.querySelector("img.comic");
        !!comic && render.eggs(comic);
    })();
}();