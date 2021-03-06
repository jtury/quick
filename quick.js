// ©2021 James Tury. Licensed under the MIT license. Contribute at https://github.com/jtury/quick
"use strict";
let httpRequest;
let cache = [];
let tagName = "main";
const parser = new DOMParser();
function fetch_information(url) {
  let index = cache.findIndex((element) => element[0].includes(url));
  let isFolder = false;
  if (index === -1) {
    if (url.slice(-5) != ".html") {
      isFolder = true;
      url += "/index.html";
    }
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          let actualResponseURL;
          if (isFolder) {
            actualResponseURL = httpRequest.responseURL.replace(
              "index.html",
              ""
            );
          } else {
            actualResponseURL = httpRequest.responseURL;
          }
          cache.push([
            actualResponseURL,
            {
              title: parser
                .parseFromString(httpRequest.responseText, "text/html")
                .getElementsByTagName("title")[0].innerHTML,
              page_content: parser
                .parseFromString(httpRequest.responseText, "text/html")
                .getElementsByTagName(tagName)[0].innerHTML,
            },
          ]);
        } else {
          return false;
        }
      }
    };
    httpRequest.open("GET", url);
    httpRequest.send();
  }
  return true;
}
function special_keys(event) {
  // fixes a bug where common keyboard shortcuts (command-click, etc.) were ignored and did not function properly
  return event.shiftKey || event.ctrlKey || event.altKey || event.metaKey;
}
function attach_hooks() {
  // this function enables prefetch links on all anchor tags with an href specified
  let anchor_array = Array.from(document.getElementsByTagName("a"));
  anchor_array.forEach((element) => {
    if (element.href && new URL(element.href).origin === location.origin) {
      element.addEventListener("pointerenter", function (/* event */) {
        setTimeout(function () {
          if (element.matches(":hover")) {
            fetch_information(element.href);
          }
        }, 85);
      });
      element.addEventListener("pointerdown", function (event) {
        if (!special_keys(event)) {
          event.preventDefault();
          fetch_information(element.href);
        }
      });
      element.addEventListener("click", function (event) {
        if (!special_keys(event)) {
          event.preventDefault();
          if (fetch_information(element.href) === true) {
            let url = element.href;
            display_page(
              cache.findIndex((element) => element[0].includes(url))
            );
          } else {
            window.location = element.href;
          }
        }
      });
    }
  });
}
function display_page(index) {
  let url = cache[index][0];
  let title = cache[index][1]["title"];
  let html = cache[index][1]["page_content"];
  document.title = title;
  document.getElementsByTagName(tagName)[0].innerHTML = html;
  window.history.pushState({ title, html }, title, url);
}
window.onpopstate = function (event) {
  let json = JSON.stringify(event.state);
  if (json !== "null") {
    json = JSON.parse(json);
    document.title = json["title"];
    document.getElementsByTagName(tagName)[0].innerHTML = json["html"];
    attach_hooks();
  }
};
window.onload = function init() {
  cache.push([
    document.location.href,
    {
      title: document.title,
      page_content: document.getElementsByTagName(tagName)[0].innerHTML,
    },
  ]);
  let url = cache[0][0];
  let title = cache[0][1]["title"];
  let html = cache[0][1]["page_content"];
  window.history.replaceState({ title, html }, title, url);
  attach_hooks();
};
