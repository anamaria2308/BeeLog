# BeeLog
An apiary management web application designed to track beehives, monitor colony health, and schedule hive inspections.

## Data model
| Field | Type | Notes |
| :--- | :--- | :--- |
| name | text | required, max 100 chars |
| inspected | boolean | toggled from the list, default false |
| colony_strength | fixed values | Puternica, Medie, Slaba |
| apiary_zone | relation | Stationar, Pastoral-Salcam, Pastoral-Tei (from week 10) |
| user | relation | the beekeeper/owner of the hives (from week 11) |

Sample data used across all stages:
1. Stupul 01 - Salcam, active, Puternica
2. Stupul 02 - Tei, done, Medie
3. Stupul 03 - Poliflora, active, Slaba

## AI usage
| Tool | Used for |
| :--- | :--- |
| Gemini | Beekeeping theme modeling, data structure mapping, and HTML/CSS mockup generation |

Details per stage: see the ai-log/ folder.

## How to run
Open index.html in a browser. No build step, no server.

## Status
- [ ] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript
## Verification Checklist - Stage 1

| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](README.md) | read |
| S1-R2 | AI usage section | [README.md#ai-usage](README.md) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L58](https://github.com/anamaria2308/BeeLog/blob/73368e6/index.html#L10-L58) | open the page |
| S1-R5 | finished card looks different | [style.css#L162-L165](https://github.com/anamaria2308/BeeLog/blob/73368e6/style.css#L162-L165) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L172-L176](https://github.com/anamaria2308/BeeLog/blob/73368e6/style.css#L172-L176) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L167-L170](https://github.com/anamaria2308/BeeLog/blob/73368e6/style.css#L167-L170) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [Commit link](https://github.com/anamaria2308/BeeLog/commit/73368e6) | commit history |