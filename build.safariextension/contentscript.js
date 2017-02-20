function getQueryParameter(uri, parameter) {
    var re = new RegExp("^(.+" + parameter + "=)(.+?)($|&).*"), enc = uri.replace(re, "$2");
    if (enc === uri) return "";
    try {
        return decodeURIComponent(enc);
    } catch (e) {
        return enc.replace("%20", " ");
    }
}

function layEgg(name) {
    var yolk = document.createElement("strong");
    yolk.className = "head " + name, yolk.style.paddingRight = ".5em", yolk.innerText = name + ":";
    var zygote = document.createElement("span");
    zygote.className = "var " + name, zygote.style.paddingBottom = ".5em", zygote.innerHTML = "<em>loading&hellip;</em>";
    var egg = document.createElement("li");
    return egg.appendChild(yolk), egg.appendChild(zygote), egg;
}

function buildNest(comic) {
    var clutch = document.createElement("ul");
    clutch.className = "clutch", clutch.style.width = comic.clientWidth + "px", clutch.style.margin = "0 auto", 
    [ "Title", "Contact", "RSS" ].map(function(name) {
        clutch.appendChild(layEgg(name));
    });
    var nest = document.createElement("td");
    nest.setAttribute("colspan", 3), nest.appendChild(clutch), document.querySelector("center table tbody").appendChild(nest);
}

function hatchEgg(name, getter) {
    var notFound = "<em>not found</em>", elm = document.querySelector(".clutch span.var." + name);
    try {
        var egg = getter();
        elm.innerHTML = egg ? egg : notFound;
    } catch (e) {
        elm.innerHTML = notFound;
    }
}

document.addEventListener("readystatechange", function() {
    if ("complete" === document.readyState) {
        var comic = document.querySelector("img.comic");
        buildNest(comic), hatchEgg("Title", function() {
            return comic.getAttribute("title");
        }), hatchEgg("Contact", function() {
            var mailto = document.querySelector(".topnav a[href^=mailto]");
            return getQueryParameter(mailto.getAttribute("href"), "subject");
        }), hatchEgg("RSS", function() {
            var item, body = document.querySelector("body"), itemData = !1, i = 0;
            do item = body.childNodes[i], 8 === item.nodeType && item.data.includes("rss-title") && (itemData = item.data), 
            ++i; while (itemData === !1);
            var re = /rss\-title[^>]+>([^<]*)/;
            return itemData.match(re)[1];
        });
    }
});