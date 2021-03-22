# Quick
### [See an example here](https://jtury.github.io/quick/) (try clicking on the links)
This is an experimental repository that shows an implementation of a fast ajax-based preloading system for the web. It uses ajax to preload page information on hover or when a user starts clicking a link, and immediately updates the DOM with this data when a click is registered. A cache is kept to ensure that no request is made twice in the same session. This software regresses to standard site loading if javascript is disabled. This software's use cases are as follows:
- Personal blogs
- Article lists
- Other template-based content

As of right now, this is experimental and subject to change. Contributions are welcome.

## Goals
- [ ] Toolchain for converting a directory of `.md` files into a quick-compatible site
- [ ] More support for edge cases
- [ ] Faster load times
  - [ ] Options for load behavior (e.g loading on `pointerdown`)
- [ ] Longer cache duration

## Inspiration
This project takes inspiration from GatsbyJS's page prefetching functionality.
