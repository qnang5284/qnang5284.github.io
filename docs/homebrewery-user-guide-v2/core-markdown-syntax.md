---
title: Core Markdown syntax
sidebar_label: Core Markdown syntax
---

# 3. Core Markdown syntax

Homebrewery uses standard Markdown for everyday writing. These four patterns cover most body text.

### Headings

Use `#` through `######`. In PHB-style themes, `#` and `##` look like chapter and section titles; `###` is a common in-column heading.

```markdown
# Chapter 3: The Saltmarsh Heist

## The Docks at Night

### Optional: Talking to the Harbor Master
```

**Tip:** Headings can feed the Table of Contents snippet. Prefer real heading lines over bold-only titles when you want a ToC later.

### Bold and italics

```markdown
The **ancient** door is *slightly ajar*.

You can combine ***bold italics*** for spell names or trait titles.
```

- `**bold**` → **bold**
- `*italics*` → *italics*
- `***both***` → ***both***

In monster traits, Homebrewery convention is italic-bold on the trait name:

```markdown
***Keen Smell.*** The hound has advantage on Wisdom (Perception) checks that rely on smell.
```



### Lists

**Unordered**

```markdown
- Grappling hook
- 50 feet of silk rope
- A very nervous mule
```

**Ordered**

```markdown
1. Approach the gate in disguise.
2. Bribe or bluff the watch.
3. Find the ledger in the counting house.
```

Nested lists indent with two to four spaces. Keep list items short; long paragraphs belong outside the list so columns still balance.

### A few extras you will see immediately

```markdown
> This blockquote becomes a **note** in the PHB theme.

A line with only a colon adds a little vertical space:

:

[Harbor map](https://example.com) and ![alt text](https://example.com/art.png)
```

You can write HTML when you must, but stay in Markdown until a snippet cannot do the job.
