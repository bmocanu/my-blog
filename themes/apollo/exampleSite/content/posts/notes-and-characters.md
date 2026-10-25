+++
title = 'Notes and Characters'
date = 2025-08-11
description = 'The note and character shortcodes.'
tags = ['example']
+++

## Note

A static note:

{{< note header="Note!" >}}This blog assumes basic terminal maturity{{< /note >}}

A clickable one that starts collapsed:

{{< note clickable=true hidden=true header="Quiz!" >}}The answer to the quiz! The body is **markdown**.{{< /note >}}

Syntax:

```text
{{</* note header="Note!" */>}}This blog assumes basic terminal maturity{{</* /note */>}}
{{</* note clickable=true hidden=true header="Quiz!" */>}}The answer{{</* /note */>}}
```

## Character

{{< character name="hooded" >}}Whaaaaaaaaaaaaaaaaaaat, that's almost 70 years ago???{{< /character >}}

I know, it's crazy.

{{< character position="left" name=":)" >}}Same character, other side.{{< /character >}}
