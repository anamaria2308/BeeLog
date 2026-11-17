# BeeLog
An apiary management web application for beekeepers: it tracks the hives in an apiary,
the strength of each colony and which hives still need to be inspected.

## Data model
| Field | Name in code | Type | Notes |
| :--- | :--- | :--- | :--- |
| name | `nume` | text | required, max 100 chars |
| inspected | `inspectat` | boolean | toggled from the list, default false |
| colony strength | `putere` | fixed values | `puternica`, `medie`, `slaba` (Puternică, Medie, Slabă) |
| frames | `rame` | integer | number of frames in the hive, 1–20 (from stage 7) |
| apiary zone | – | relation | Staționar, Pastoral-Salcâm, Pastoral-Tei (from week 10) |
| user | – | relation | the beekeeper who owns the hives (from week 11) |

Sample data used across all stages:
1. Stupul 01 - Salcâm, active, Puternică
2. Stupul 02 - Tei, done, Medie
3. Stupul 03 - Polifloră, active, Slabă

## How to run
Stage 1–2 mockup: open `mockup/index.html` in a browser (no build step, no server).

The React app (stage 3 onwards) lives in `frontend/`:

```bash
cd frontend
npm install
npm run api    # terminal 1, mock API on http://localhost:3001
npm run dev    # terminal 2, app on http://localhost:5173
```

## AI usage
| Tool | Used for |
| :--- | :--- |
| Gemini | Beekeeping theme modeling, data structure mapping, HTML/CSS mockup, help with stages 2–6 |
| Claude | Review of stages 1–6 (CSS and README fixes), form and server-side CRUD (stage 7), routing, detail page and CSS Modules (stage 8) |

Details per stage: see the ai-log/ folder.

## Status
- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project
- [x] Stage 4: components rendered from data
- [x] Stage 5: local state and events
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [ ] Stage 9: own backend with Express

## Stage 1: static mockup
Plain HTML and CSS in `mockup/`: header, add form, three hive cards, two columns on
desktop and one under 700px, visible focus and a dark theme.

### Verification Checklist - Stage 1
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S1-R1 | README: description, fields, sample data, how to run | [README.md](README.md) | read |
| S1-R2 | AI usage section | [README.md#ai-usage](#ai-usage) | read |
| S1-R3 | AI log for stage 1 | [ai-log/etapa-01.md](ai-log/etapa-01.md) | read |
| S1-R4 | header, form (text + select), 3 cards with own data | [index.html#L10-L58](https://github.com/anamaria2308/BeeLog/blob/73368e6/index.html#L10-L58) | open the page |
| S1-R5 | finished card looks different | [style.css#L162-L165](https://github.com/anamaria2308/BeeLog/blob/73368e6/style.css#L162-L165) | look at the card |
| S1-R6 | 2 columns on desktop, 1 under 700px | [style.css#L172-L176](https://github.com/anamaria2308/BeeLog/blob/73368e6/style.css#L172-L176) | resize < 700px |
| S1-R7 | visible focus, readable dark theme | [style.css#L167-L170](https://github.com/anamaria2308/BeeLog/blob/73368e6/style.css#L167-L170) | Tab; dark mode |
| S1-R8 | commit "Stage 1" pushed | [73368e6](https://github.com/anamaria2308/BeeLog/commit/73368e6) | commit history |

## Stage 2: data logic
Plain JavaScript, no DOM. `stupi.js` holds the array and the functions that read and change it.
Results are printed in the browser console (F12). Since stage 3 the files live in `mockup/`.

### Verification Checklist - Stage 2
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S2-R1 | JS file linked, logs on page load | [index.html#L66](https://github.com/anamaria2308/BeeLog/blob/c13ac0c/index.html#L66) | open page, F12 |
| S2-R2 | 3+ items with id, name, state, tag | [stupi.js#L2-L6](https://github.com/anamaria2308/BeeLog/blob/c13ac0c/stupi.js#L2-L6) | read |
| S2-R3 | list, count, search, add, toggle, delete | [stupi.js#L11-L69](https://github.com/anamaria2308/BeeLog/blob/c13ac0c/stupi.js#L11-L69) | console output |
| S2-R4 | add rejects empty name and invalid tag | [stupi.js#L30-L38](https://github.com/anamaria2308/BeeLog/blob/c13ac0c/stupi.js#L30-L38) | last 2 console lines |
| S2-R5 | original array unchanged after add | [stupi.js#L81](https://github.com/anamaria2308/BeeLog/blob/c13ac0c/stupi.js#L81) | console line |
| S2-R6 | README Stage 2 section + AI log | [README.md](README.md), [ai-log/etapa-02.md](ai-log/etapa-02.md) | read |
| S2-R7 | commit "Stage 2" pushed | [c13ac0c](https://github.com/anamaria2308/BeeLog/commit/c13ac0c) | commit history |

## Stage 3: Vite and React project
The app now lives in `frontend/`, built with Vite. The data from stage 2 moved into the main
component; the list is still printed raw.

### Verification Checklist - Stage 3
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S3-R1 | npm run dev starts without errors | [frontend/package.json](https://github.com/anamaria2308/BeeLog/blob/1d16bce/frontend/package.json) | npm install, npm run dev |
| S3-R2 | app name and counter computed from data | [App.jsx#L10-L19](https://github.com/anamaria2308/BeeLog/blob/1d16bce/frontend/src/App.jsx#L10-L19) | edit data, save |
| S3-R3 | data from README, not from the example | [App.jsx#L2-L6](https://github.com/anamaria2308/BeeLog/blob/1d16bce/frontend/src/App.jsx#L2-L6) | compare with README |
| S3-R4 | stage 1 styles reused | [App.css](https://github.com/anamaria2308/BeeLog/blob/1d16bce/frontend/src/App.css) | look at the page |
| S3-R5 | node_modules ignored, build passes | [frontend/.gitignore](https://github.com/anamaria2308/BeeLog/blob/1d16bce/frontend/.gitignore) | npm run build |
| S3-R6 | README Stage 3 section + AI log | [README.md](README.md), [ai-log/etapa-03.md](ai-log/etapa-03.md) | read |
| S3-R7 | commit "Stage 3" pushed | [1d16bce](https://github.com/anamaria2308/BeeLog/commit/1d16bce) | commit history |

## Stage 4: components
The list is rendered from the data, through two components:
- `StupList` receives the whole array and renders one card per item.
- `StupCard` receives a single item through props and displays it.

### Verification Checklist - Stage 4
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S4-R1 | 2+ components in src/components/ | [frontend/src/components/](https://github.com/anamaria2308/BeeLog/tree/8992aef/frontend/src/components) | open folder |
| S4-R2 | card receives data through props | [StupCard.jsx#L8](https://github.com/anamaria2308/BeeLog/blob/8992aef/frontend/src/components/StupCard.jsx#L8) | read |
| S4-R3 | map + key={id}, no console warnings | [StupList.jsx#L12-L14](https://github.com/anamaria2308/BeeLog/blob/8992aef/frontend/src/components/StupList.jsx#L12-L14) | F12, Console |
| S4-R4 | message for empty list | [StupList.jsx#L5-L7](https://github.com/anamaria2308/BeeLog/blob/8992aef/frontend/src/components/StupList.jsx#L5-L7) | set array to [] |
| S4-R5 | state changes the card look | [StupCard.jsx#L10](https://github.com/anamaria2308/BeeLog/blob/8992aef/frontend/src/components/StupCard.jsx#L10) | toggle a done flag |
| S4-R6 | README Stage 4 section + AI log | [README.md](README.md), [ai-log/etapa-04.md](ai-log/etapa-04.md) | read |
| S4-R7 | commit "Stage 4" pushed | [8992aef](https://github.com/anamaria2308/BeeLog/commit/8992aef) | commit history |

## Stage 5: local state and events
The list lives in React state. Checking and deleting work from the page, and the counters in
the header follow automatically. A button in the header switches between light and dark mode.
Changes are lost on refresh, which is what stage 6 and stage 7 fix.

### Verification Checklist - Stage 5
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S5-R1 | list kept in useState, in App | [App.jsx#L17](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.jsx#L17) | read |
| S5-R2 | toggling changes state and card look | [App.jsx#L21-L25](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.jsx#L21-L25), [StupCard.jsx#L11-L15](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/components/StupCard.jsx#L11-L15) | click a checkbox |
| S5-R3 | delete removes the item | [App.jsx#L28-L30](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.jsx#L28-L30), [StupCard.jsx#L33-L40](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/components/StupCard.jsx#L33-L40) | click Delete |
| S5-R4 | header counter derived, not in state | [App.jsx#L40-L42](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.jsx#L40-L42) | toggle, watch header |
| S5-R5 | immutable updates (no push, splice, assignment) | [App.jsx#L21-L30](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.jsx#L21-L30) | read |
| S5-R6 | light/dark toggle: state + data-theme on html | [App.jsx#L33-L37](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.jsx#L33-L37), [App.css#L17-L61](https://github.com/anamaria2308/BeeLog/blob/5bbface/frontend/src/App.css#L17-L61) | click the button, both system themes |
| S5-R7 | no console warnings; README + AI log | [README.md](README.md), [ai-log/etapa-05.md](ai-log/etapa-05.md) | F12, Console |
| S5-R8 | commit "Stage 5" pushed | [5bbface](https://github.com/anamaria2308/BeeLog/commit/5bbface) | commit history |

## Stage 6: data from a mock API
The list is served by json-server from `db.json`. The app fetches it on load and shows a
loading state and an error state.

### Verification Checklist - Stage 6
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S6-R1 | npm run api starts, route shows JSON | [package.json](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/package.json), [db.json](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/db.json) | open localhost:3001/stupi |
| S6-R2 | data no longer in React code | [App.jsx#L10](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/src/App.jsx#L10) | read |
| S6-R3 | loading message while waiting | [App.jsx#L104](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/src/App.jsx#L104) | --delay 4000 |
| S6-R4 | error message when API is down | [App.jsx#L106-L110](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/src/App.jsx#L106-L110) | stop npm run api, refresh |
| S6-R5 | fetch only in api.js, URL from env | [api.js](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/src/api.js), [.env.example](https://github.com/anamaria2308/BeeLog/blob/e4b408d/frontend/.env.example) | search for fetch |
| S6-R6 | README Stage 6 section + AI log | [README.md](README.md), [ai-log/etapa-06.md](ai-log/etapa-06.md) | read |
| S6-R7 | commit "Stage 6" pushed | [e4b408d](https://github.com/anamaria2308/BeeLog/commit/e4b408d) | commit history |

## Stage 7: form and validation
Hives can be added from the page. The form is controlled and validated (name required,
max 100 chars; frames an integer between 1 and 20), and every change (add, toggle, delete)
goes to the API before it shows up in the list. `tw.json` and the `data-testid` attributes
prepare the app for automated checking.

### Verification Checklist - Stage 7
| ID | Requirement | Where (permalink) | How to check |
| :--- | :--- | :--- | :--- |
| S7-R1 | controlled form: value + onChange on every field | [StupForm.jsx#L63-L114](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/components/StupForm.jsx#L63-L114) | read |
| S7-R2 | empty title shows an error, nothing is sent | [StupForm.jsx#L22-L45](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/components/StupForm.jsx#L22-L45) (valideaza) | submit empty, watch Network |
| S7-R3 | added item shows in the list and survives refresh | [App.jsx#L39-L42](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/App.jsx#L39-L42) (handleAdd), [api.js#L5-L23](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/api.js#L5-L23) | add, refresh |
| S7-R4 | toggle and delete survive refresh | [App.jsx#L44-L61](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/App.jsx#L44-L61), [api.js#L25-L34](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/api.js#L25-L34) | toggle/delete, refresh |
| S7-R5 | button disabled while sending, form cleared only on success | [StupForm.jsx#L48-L60](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/components/StupForm.jsx#L48-L60), [StupForm.jsx#L111-L113](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/components/StupForm.jsx#L111-L113) | --delay 3000; stop API and submit |
| S7-R6 | tw.json and the data-testid attributes from table 7.3 | [tw.json](https://github.com/anamaria2308/BeeLog/blob/b1bc735/tw.json), [StupCard.jsx#L9-L48](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/components/StupCard.jsx#L9-L48), [StupForm.jsx](https://github.com/anamaria2308/BeeLog/blob/b1bc735/frontend/src/components/StupForm.jsx) | querySelectorAll in the console |
| S7-R7 | README Stage 7 section + AI log | [README.md](README.md), [ai-log/etapa-07.md](ai-log/etapa-07.md) | read |
| S7-R8 | commit "Stage 7" pushed | [b1bc735](https://github.com/anamaria2308/BeeLog/commit/b1bc735) | commit history |

## Stage 8: routing and detail page
Pages behind React Router: the list at `/`, a detail page at `/stupi/:id`, an about page
at `/despre`, plus a 404 page. Header, navigation and footer are written once, in `Layout`.
Component styles moved to CSS Modules; `index.css` keeps only the colour variables and the
shared classes. The interface got an apiary look: honeycomb background, honey header,
hexagon icons, a colony-strength meter (`PutereMeter`) and the hive frames drawn on the detail page.
The list page also has a greeting banner with today's date, search and status filters (`FiltruBar`),
entry animations for the cards and a short notification after adding or deleting (`Toast`).
