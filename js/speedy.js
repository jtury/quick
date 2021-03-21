let httpRequest;

let cache = [];

function fetch_information(url) {
    let index = check_if_cached(url);
    if (index === -1) {
        url = url + '/index.json';
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            return false;
        }

        httpRequest.onreadystatechange = parse_response;
        httpRequest.open('GET', url);
        httpRequest.send();
    }
    return true;
}

function parse_response() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            cache.push(
                [
                    httpRequest.responseURL.replace("index.json", ""),
                    JSON.parse(httpRequest.responseText)
                ]
            );
        } else {
            alert("Hmm.. something's not right. Please email the developer and let them know you received an error of code #2. Thanks!");
            return false;
        }
    }
}

function check_if_cached(url) {
    return cache.findIndex(element => element[0].includes(url))
}

function attach_hooks() { // this function enables prefetch links on all anchor tags with an href specified
    let anchor_array = Array.from(document.getElementsByTagName("a"));
    anchor_array.forEach(element => {
        if (element.href && new URL(element.href).origin === location.origin) {
            element.addEventListener('pointerenter', function (event) {
                setTimeout(function () {
                    if (element.matches(':hover')) {
                        fetch_information(element.href)
                    }
                }, 100);
            });
            element.addEventListener('pointerdown', function (event) {event.preventDefault()});
            element.addEventListener('click', function (event) {
                event.preventDefault();
                if (fetch_information(element.href) !== true) {
                    window.location = element.href;
                }
            });
        }
    });
}

attach_hooks();