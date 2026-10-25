+++
title = 'Markdown Test'
date = 2022-01-01
lastmod = 2022-05-01
tags = ['example', 'markdown']
+++

# H1

## H2

### H3

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquet sagittis id consectetur purus ut. In pellentesque massa placerat duis ultricies. Neque laoreet suspendisse interdum consectetur libero id. Justo nec ultrices dui sapien eget mi proin. [Example](https://example.org)

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Code Block

```rust
fn main() {
    println!("Hello World");
}
```

With line numbers and a highlighted line:

```rust {linenos=inline,hl_lines=[2]}
fn main() {
    println!("Hello World");
}
```

```toml
[params]
  theme = 'toggle'
```

A block without a language:

```
plain text
```

## Ordered List

1. First item
2. Second item
3. Third item

## Unordered List

- List item
- Another item
- And another item

## Nested list

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

## Quote

> Two things are infinite: the universe and human stupidity; and I'm not sure about the
> universe.<br>
> — <cite>Albert Einstein</cite>

## Table Inline Markdown

| Italics   | Bold     | Code   | StrikeThrough     |
| --------- | -------- | ------ | ----------------- |
| _italics_ | **bold** | `code` | ~~strikethrough~~ |

## Foldable Text

<details>
    <summary>Title 1</summary>
    <p>IT'S A SECRET TO EVERYBODY.</p>
</details>

## Code tags

Lorem ipsum `dolor` sit amet, `consectetur adipiscing` elit.
