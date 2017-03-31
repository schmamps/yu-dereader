!function() {
    "use strict";
    function Field(name) {
        this.name = name, this.then = hatch(this.name);
    }
    const elm = {
        get: selector => document.querySelector(selector),
        new: tagName => document.createElement(tagName)
    }, yolk = name => {
        let strong = elm.new("strong");
        return strong.style.paddingRight = ".5em", strong.textContent = name, strong;
    }, zygote = value => {
        let span = elm.new("span");
        return span.style.paddingBottom = ".5em", span.innerHTML = value.toString(), span;
    }, egg = (name, value) => {
        let li = elm.new("li");
        return li.appendChild(yolk(name)), li.appendChild(zygote(value)), li;
    }, hatch = name => (function(value) {
        elm.get("ul.clutch").appendChild(egg(name, value));
    }), clutch = width => {
        let ul = elm.new("ul");
        ul.className = "clutch", ul.style.width = width + "px", ul.style.margin = "auto", 
        ul.style.padding = 0;
        let td = elm.new("td");
        return td.appendChild(ul), td;
    }, nest = width => {
        let tr = elm.new("tr");
        tr.appendChild(elm.new("td")), tr.appendChild(clutch(width)), tr.appendChild(elm.new("td")), 
        elm.get("center tbody").appendChild(tr);
    }, title = comic => {
        let field = new Field("Title");
        return field.resolve = (() => comic.getAttribute("title")), field;
    }, contact = () => {
        const field = new Field("Contact");
        return field.resolve = (() => {
            let href = elm.get(".topnav a[href^=mailto]").getAttribute("href"), subject = href.replace(/^.+subject=/, "");
            return decodeURIComponent(subject);
        }), field;
    }, rss = () => {
        let field = new Field("RSS"), xPath = "/html/body//comment()[contains(., 'rss-title')]", xType = XPathResult.ANY_TYPE;
        return field.resolve = (() => document.evaluate(xPath, document, null, xType).iterateNext().data.replace(/<(\!\-{2}.+?|\/.+?\-{2})>/g, "")), 
        field;
    }, onReady = () => {
        if ("complete" === document.readyState) {
            let comic = elm.get("img.comic");
            nest(comic.clientWidth), [ title(comic), contact(), rss() ].map(function(field) {
                Promise.resolve(field.resolve()).then(field.then);
            });
        }
    };
    document.addEventListener("readystatechange", onReady);
}();