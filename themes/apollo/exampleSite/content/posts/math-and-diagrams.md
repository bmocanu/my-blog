+++
title = 'Math and Diagrams'
date = 2024-12-26
summary = 'MathJax formulas and a mermaid diagram.'
tags = ['example']
mathjax = true
+++

A manual summary, written in the front matter, is shown in the post list.

## Inline Math

- $(a+b)^2$ = $a^2 + 2ab + b^2$
- A polynomial P of degree d over $\mathbb{F}_p$ is an expression of the form
  $P(s) = a_0 + a_1 . s + a_2 . s^2 + ... + a_d . s^d$

## Displayed Math

$$
p := (\sum_{k∈I}{c_k.v_k} + \delta_v.t(x))·(\sum_{k∈I}{c_k.w_k} + \delta_w.t(x))
$$

## Mermaid

```mermaid
graph LR
    A[Start] --> B[Initialize]
    B --> C[Processing]
    C --> D[Complete]
```
