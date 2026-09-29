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