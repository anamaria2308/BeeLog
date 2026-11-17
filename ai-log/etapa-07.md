# Stage 7: AI log

## Tools
- Claude (claude.ai)

## Conversations
- https://claude.ai/share/ec92598a-455e-4a48-b7d1-55d16fdd494b
- Review of stages 1–6 and implementation of stage 7: controlled form with validation,
  POST / PATCH / DELETE through a shared `request` function, `tw.json` and `data-testid` attributes.

## Key requests
### 1. Review of the previous stages
Asked: Check whether stages 1–6 are done correctly and fix what is wrong.
- Got: `App.css` had been accidentally emptied in the working copy (only the stage 6 rules were left);
  one dark-theme selector was invalid (`:root[data-theme="dark"] .badge-puternica,` followed by `@media`),
  so the "Puternică" badge did not change colour in manual dark mode; there was no `:focus-visible` rule;
  the README had two "How to run" and two "Status" sections, and the stage 2 links pointed to files that
  had moved to `mockup/`.
- Changed: the badge colours became CSS variables, redefined only in the dark theme blocks; the README
  was reorganised and the old checklist links point to the commit of their stage.

### 2. Form and server-side changes
Asked: Add a form that creates hives on the server, with validation, and move toggle and delete to the API.
- Got: `StupForm` (controlled inputs, `noValidate`, error shown under the form, button disabled while
  sending), `request()` in `api.js` plus `createStup`, `updateStup`, `deleteStup`; `handleAdd` without
  `try`, so the error reaches the form.
- Changed: added a theme-specific field, `rame` (number of frames, integer 1–20), as the extra validation
  required by the guide; it is also stored in `db.json` and listed in `tw.json` → `sample`.

### 3. Automated checking
Asked: Which `data-testid` attributes and which `tw.json` the checker needs for BeeLog.
- Got: `tw.json` with `resource: "stupi"`, `title: "nume"`, `done: "inspectat"`; `form-putere` and
  `form-rame` named after the fields in `db.json`.

## What I learned / what did not work
State must be updated with what the server returns, not with what was sent: the id comes from the
server. Clearing the form only after `await` keeps the typed text when the API is down. A controlled
checkbox only changes after the PATCH answer arrives, so the UI never shows something unsaved.
