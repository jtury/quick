# Quick
### [See an example here](https://jtury.github.io/quick/) (try clicking on the links)
## The short of it:
`quick.js` is a slim javascript file<sup>[1](#fn-1)</sup> that automatically implements page prefetching and a visually-instantaneous load system to all local URLs on your site. The behavior of outbound links is unchanged. Keyboard shortcuts like command-click or shift-click are respected.

## The long of it:
This is an experimental repository that shows an implementation of a fast ajax-based preloading system for the web. It uses ajax to preload page information on hover or when a user starts clicking a link, and immediately updates the DOM with this data when a click is registered. A cache is kept to ensure that no request is made twice in the same session. This software regresses to default site loading behavior if javascript is disabled.

As of right now, this is experimental and subject to change. Contributions and/or comments are very welcome.

## Implementation guide:
In all of your website's html files, put a script tag linking to `quick.min.js` before `</body>` like so:
```html
...
<body>
...
  <script src="https://cdn.jsdelivr.net/gh/jtury/quick@0.1/quick.min.js"></script>
</body>
...
```
Now that you have the script installed, you will need to wrap the contents of all of your page (beginning at `<body>` and ending just before any scripts) in a `<main id="page">` tag, like so:
```html
...
<body>
  <main id="page">
    <!--
      Your page contents here
    -->
  </main>
  <script src="https://cdn.jsdelivr.net/gh/jtury/quick@0.1/quick.min.js"></script>
</body>
...
```
Note that you can replace the `<main>` tag with any other tag<sup>[2](#fn-2)</sup> as long as the id remains the same.

<a name="fn-1">1</a>: About 4kb uncompressed, 2kb compressed (as of Jun 10)

<a name="fn-2">2</a>: It's not recommended, so if you have any doubt use the default tag