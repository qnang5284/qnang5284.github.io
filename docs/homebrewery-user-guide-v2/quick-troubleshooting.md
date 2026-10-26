---
title: Quick troubleshooting
sidebar_label: Quick troubleshooting
---

# 9. Quick troubleshooting

| What you see                                  | Likely cause                                                  | What to try                                                              |
| --------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Text hanging off the page                     | Overflow into a third CSS column, or a missing `\page`        | Add a page break; shorten the column; move a tall block                  |
| `\page` does nothing                          | It is not alone at the start of a line                        | Put it on its own line                                                   |
| Right column empty                            | No overflow and no `\column`                                  | Insert `\column` where the right-hand section should start               |
| Stat block looks like a note                  | Missing `{{monster,frame` (V3) or snippet not inserted        | Re-insert the PHB monster snippet                                        |
| Table crushed                                 | Table is in a single column                                   | Wrap in `{{wide ... }}`                                                  |
| PDF missing backgrounds                       | Print dialog dropped background graphics                      | Turn **Background graphics** on, margins none, letter, 100%              |
| PDF differs from HTML around `wide`           | Rare browser column bug, or `\column` directly above `{{wide` | Prefer Chrome; avoid a hard column break immediately before a wide block |
| Contents page numbers disagree with the folio | ToC generated before skip/restart, or not regenerated         | Fix numbering snippets, then run **Table of Contents** again             |

You are not expected to get the first page perfect. Adjust `\page` and `\column` the way you would nudge frames in a desktop publisher.
