# Apollo for Hugo

A Hugo port of the [Apollo](https://github.com/not-matthias/apollo) theme for Zola: minimalistic,
monospace accents, light/dark mode, project cards, search, table of contents.

Built and tested with Hugo extended 0.167. No Sass or Node needed: the CSS and JS are bundled by Hugo
(`css.Build` / `js.Build`).

Try it with the demo site:

```sh
hugo server --source themes/apollo/exampleSite
```

## Site configuration

Hugo only merges `params`, `menus` and `languages` from a theme's config, so the site's own
`hugo.toml` needs these (copy them from `exampleSite/hugo.toml`):

```toml
theme = 'apollo'

[taxonomies]
  tag = 'tags'                                # only tags, no categories

[outputs]
  home = ['html', 'rss', 'json']              # the json output is the search index

[pagination]
  pagerSize = 7

[markup]
  [markup.goldmark.renderer]
    unsafe = true                             # raw HTML in content (e.g. the home hero)
  [markup.goldmark.extensions.passthrough]    # $...$ and $$...$$ for MathJax
    enable = true
    [markup.goldmark.extensions.passthrough.delimiters]
      block = [['$$', '$$'], ['\[', '\]']]
      inline = [['$', '$'], ['\(', '\)']]
  [markup.highlight]
    noClasses = false                         # colors come from the theme's CSS
    guessSyntax = false
    lineNumbersInTable = false
```

Menu entries come from `[menus.main]`, social icons from `params.socials`.

## Params

Defaults and comments are in [`hugo.toml`](hugo.toml). The main ones:

| Param | Default | |
| --- | --- | --- |
| `theme` | `toggle` | `light`, `dark`, `auto` (follow the OS), `toggle` (button), `toggle-auto` (light/dark/auto button) |
| `description` | | Meta description of the site |
| `toc` | `true` | Table of contents on the right of pages with headings (also per page: `toc = false`) |
| `search` | `true` | Search button and `Ctrl/Cmd + K` modal |
| `fancyCode` | `true` | Language label and copy button on code blocks |
| `dynamicNote` | `true` | Collapsible notes |
| `mathjax` | `false` | MathJax on every page (also per page: `mathjax = true`) |
| `wordCount` | `false` | Word count in the post meta line |
| `home.latestPosts` / `home.sections` | `5` / `['posts']` | Latest posts below the home page content |
| `logo` | | Image (in `static/`) shown instead of the site title |
| `repoURL` / `repoView` | | "Source Code" link in the post meta line |
| `socials` | | List of `{ name, url, icon }`; `icon` is a file in `static/icons/social/` (without `.svg`) |

## Content

| Content | Layout |
| --- | --- |
| `content/_index.md` | Home page: its content, then the latest posts. A `title` in the front matter shows as a page header |
| `content/posts/`, `content/homelab/`, any other section | Post list with pagination: `date # title`, plus the description (or a `summary` / `<!--more-->`) when there is one |
| `content/projects/_index.md` with `layout = 'cards'` | Project cards |
| `content/profile.md` (any single page) | Page with title, meta line, content and table of contents |
| `/tags/` and `/tags/<tag>/` | Tag list (most used first) and the pages of a tag |

Post front matter: `title`, `date`, `lastmod` (shows "Updated on"), `description`, `tags`, `tldr`,
`read_time = true` (shows the reading time), `mathjax`, `toc`.

### Project cards

The section's `_index.md` can set `cards_columns` (default 2) and `card_media_height` (default 400, the
height in px the images are resized to). Each project page can set:

```toml
title = 'My project'
description = 'One line shown under the title'
weight = 1                        # order
image = 'cover.jpg'               # or video = 'demo.webm', or a full URL
github = 'https://github.com/...' # "GitHub" button
demo = 'https://...'              # "Demo" button
links = [{ url = 'https://...', text = 'Docs', icon = 'globe' }]   # more buttons
tags = ['rust', 'docker']         # shown as #tags
link_to = 'https://...'           # the title links here instead of the project page
```

`image` / `video` are looked up in the project's page bundle (`projects/my-project/index.md` +
`cover.jpg`), next to `projects/_index.md`, in `assets/`, and finally in `static/`. A project page is only
linked from its card when it has content.

### Shortcodes and code blocks

```md
{{< note header="Heads up" clickable=true hidden=true center=false >}}Markdown *body*{{< /note >}}

{{< character name="hooded" position="left" >}}Markdown *body*{{< /character >}}
```

`character` takes `name`, `type`, `position` (`left` / `right`) and `image` (a file in
`static/images/characters/`). Fenced `mermaid` code blocks render as diagrams (mermaid is loaded from a CDN
only on pages that use one).

## Customizing

* Add CSS or JS to every page by overriding `layouts/_partials/hooks/head-end.html` (or `head-start.html`,
  `body-start.html`, `body-end.html`) in the site.
* The colors are CSS variables in `assets/css/components/theme.css`.
* The syntax colors (`github` / `github-dark`) are `assets/css/components/syntax-light.css` and
  `syntax-dark.css`. To use other [Chroma styles](https://gohugo.io/quick-reference/syntax-highlighting-styles/)
  regenerate them with `hugo gen chromastyles --style=<name> --mode=light --modeSelector` (and `--mode=dark`),
  then drop the background colors of `.bg` and `.chroma` from the output.

## Differences from the Zola theme

* Search: a small script (`assets/js/search.js`) over `/index.json` replaces elasticlunr. Same modal and
  shortcuts, simpler ranking.
* Not ported: analytics (GoatCounter, Umami, Google), comments, the talks page, the `image` component
  (use Hugo's image processing or markdown images).
* The fonts are Zed Text and JetBrains Mono. The Zola theme also declared Zed Display and Space Grotesk, but
  its `--header-font` declaration was invalid, so the headings always rendered in Zed Text; that is what is
  reproduced here.

Apollo for Zola is MIT licensed, see [LICENSE](LICENSE). Social icons: see
[`static/icons/social/LICENSE`](static/icons/social/LICENSE).
