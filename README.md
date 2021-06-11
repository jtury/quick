# Quick
### [See an example here](https://jtury.github.io/quick/) (try clicking on the links)
## The short of it:
`quick.js` is a slim javascript file<sup><a name="fn-1-ref" href="#fn-1">1</a></sup> that automatically implements page prefetching and a visually-instantaneous load system to all local URLs on your site. The behavior of outbound links is unchanged. Keyboard shortcuts like command-click or shift-click are respected.

## The long of it:
This is an experimental repository that shows an implementation of a fast ajax-based preloading system for the web. It uses ajax to preload page information on hover or when a user starts clicking a link, and immediately updates the DOM with this data when a click is registered. A cache is kept to ensure that no request is made twice in the same session. This software regresses to default site loading behavior if javascript is disabled.

As of right now, this is experimental and subject to change. Contributions and/or comments are very welcome.

### Known bugs:
- [ ] Images may not load correctly if linked with relative URLs

## Implementation guide:
In all of your website's html files, put a script tag linking to `quick.min.js` before `</head>` like so:
```html
...
<head>
...
  <script src="https://cdn.jsdelivr.net/gh/jtury/quick@latest/quick.min.js" defer></script>
</head>
...
```
Now that you have the script installed, you will need to wrap the contents of all of your page (beginning at `<body>` and ending just before any scripts) in a `<main>` tag, like so:
```html
...
<body>
  <main>
    <!--
      Your page contents here
    -->
  </main>
</body>
...
```
Note that there can only be one `<main>` tag present in a file for `quick.js` to work correctly.

<a name="fn-1">1</a>: About 3.9kb unmodified, 2.5kb minified,  (as of Jun 11) <a href="#fn-1-ref">↩︎&#xFE0E;</a>