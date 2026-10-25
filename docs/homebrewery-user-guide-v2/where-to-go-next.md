---
title: Where to go next
sidebar_label: Where to go next
---

# 10. Where to go next

- Editor: [https://homebrewery.naturalcrit.com](https://homebrewery.naturalcrit.com)
- Changelog (new snippets and print behavior): project [changelog](https://github.com/naturalcrit/homebrewery/blob/master/changelog.md)
- Help from other authors: [r/homebrewery](https://www.reddit.com/r/homebrewery/)
- Bugs and requests: [naturalcrit/homebrewery issues](https://github.com/naturalcrit/homebrewery/issues)

---

### A small working starter

Paste this into a new V3 brew to practise layout, a table, a note, and a stat block, then export once so the print settings are familiar before a deadline.

```markdown
{{skipCounting}}

# Saltmarsh Gazetteer

A one-evening heist on the docks.

\page

{{resetCounting}}
{{pageNumber,auto}}
{{footnote THE HARBOR}}

## The Docks at Night

Welcome to a preview of the watch, the vault, and the thing under the pier.

- **Theme:** smugglers, bells, and bad weather
- **Tone:** tense, but the locals still gossip

\column

### Using this page

Keep sessions short. Let the party pick **one** lead, then cut to the pier.

::::

See also [the vault](#p3).

{{note
##### Harbor Watch
A bribe under 5 gp buys a shrug. A talking gull buys a full report.
}}

{{wide
##### Harbor leads

| d4 | Lead |
|:--:|:-----|
| 1 | A clerk “lost” last night’s ledger |
| 2 | The mastiff will not go near the vault |
| 3 | Tide marks on the counting-house floor |
| 4 | Someone paid the watch in foreign coin |
}}

\page

{{pageNumber,auto}}
{{footnote THE HARBOR}}

## The Vault Door

Two iron bars and a sleeping mastiff.

{{monster,frame
## Harbor Mastiff
*Medium beast, unaligned*
___
**Armor Class** :: 12
**Hit Points** :: 11 (2d8 + 2)
**Speed** :: 40 ft.
___
|STR|DEX|CON|INT|WIS|CHA|
|:---:|:---:|:---:|:---:|:---:|:---:|
|13 (+1)|14 (+2)|12 (+1)|3 (−4)|12 (+1)|7 (−2)|
___
**Skills** :: Perception +3
**Senses** :: passive Perception 13
**Languages** :: —
**Challenge** :: 1/8 (25 XP) {{bonus **Proficiency Bonus** +2}}
___
***Keen Hearing and Smell.*** The mastiff has advantage on Wisdom (Perception) checks that rely on hearing or smell.

### Actions
***Bite.*** *Melee Weapon Attack:* +3 to hit, reach 5 ft., one target. *Hit:* 4 (1d6 + 1) piercing damage.
}}

<!-- Balance pass: mastiff should be a warning, not a TPK. -->
```

That loop is page flow, numbering, a footer, a column break, spacing, a note, a wide table, a framed stat block, an in-brew page link, and a comment. Use [Player's Handbook snippets](./players-handbook-snippets.md) for more PHB blocks and [Images, Tables, Fonts and License](./images-tables-fonts-and-license.md) for images, tables, fonts, and licenses.
