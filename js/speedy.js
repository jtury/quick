let httpRequest;
let cache = [];


//TODO: Fix bug with # links!

function fetch_information(url) {
    let index = cache.findIndex(element => element[0].includes(url));
    if (index === -1) {
        url = url + '/index.json';
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            return false;
        }

        httpRequest.onreadystatechange = function () {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                cache.push(
                    [
                        httpRequest.responseURL.replace("index.json", ""),
                        JSON.parse(httpRequest.responseText)
                    ]
                );
            } else {
                alert("Something went wrong. Try disabling javascript and try again.");
                return false;
            }
        }
    };
        httpRequest.open('GET', url);
        httpRequest.send();
    }
    return true;
}

function attach_hooks() { // this function enables prefetch links on all anchor tags with an href specified
    let anchor_array = Array.from(document.getElementsByTagName("a"));
    anchor_array.forEach(element => {
        if (element.href && new URL(element.href).origin === location.origin) {
            element.addEventListener('pointerenter', function (/* event */) {
                setTimeout(function () {
                    if (element.matches(':hover')) {
                        fetch_information(element.href)
                    }
                }, 65);
            });
            element.addEventListener('pointerdown', function (event) {
                event.preventDefault();
                fetch_information(element.href);
            });
            element.addEventListener('click', function (event) {
                event.preventDefault();
                if (fetch_information(element.href) === true) {
                    let url = element.href;
                    display_page(cache.findIndex(element => element[0].includes(url)));
                } else {
                    window.location = element.href;
                }
            });
        }
    });
}

function init() {
    cache.push([document.location.href, {
        "title": document.title,
        "page_content": document.getElementById("page").innerHTML
    }]);

    let url = cache[0][0];
    let title = cache[0][1]["title"];
    let html = cache[0][1]["page_content"];
    window.history.replaceState({title, html},title, url);
    attach_hooks();
}

function display_page(index) {
    let url = cache[index][0];
    let title = cache[index][1]["title"];
    let html = cache[index][1]["page_content"];

    document.title = title;
    document.getElementById("page").innerHTML = html;
    window.history.pushState({title, html},title, url);
}

window.onpopstate = function(event) {
    let json = JSON.stringify(event.state);

    if (json !== 'null') {
        json = JSON.parse(json);
        document.title = json["title"];
        document.getElementById("page").innerHTML = json["html"];
        attach_hooks();
    }
};