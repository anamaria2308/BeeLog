# Stage 8: AI log

## Tools
- Claude (claude.ai)

## Conversations
- https://claude.ai/share/ec92598a-455e-4a48-b7d1-55d16fdd494b
- React Router (routes, common layout, detail page, 404) and moving the styles to CSS Modules.

## Key requests
### 1. Routes and layout
Asked: Split the app into pages with React Router, with a layout written once.
- Got: `BrowserRouter` in `main.jsx`, the route map in `App.jsx` (`/`, `/stupi/:id`, `/despre`, `*`),
  `Layout` with `NavLink` (with `end` on `/`) and `Outlet`; the whole stage 7 `App` moved to `StupiPage`.
- Changed: the light/dark button from stage 5 moved into `Layout`, since the header is now common;
  the counter and the inspection progress bar moved into the list panel.

### 2. Detail page
Asked: A detail page that reads the id from the URL and handles a missing hive.
- Got: `StupDetaliuPage` with `useParams`, an effect with `[id]` as dependency and the `ignore` flag,
  an error message plus a link back for `/stupi/999`, and `fetchStup(id)` in `api.js`.
- Changed: the page also shows the number of frames, which is not on the card.

### 3. CSS Modules
Asked: Move each component's rules next to the component.
- Got: one `.module.css` per component and page; `index.css` keeps the variables, `body`, `.panel`,
  `.btn`, `.btn-danger`, `.error`, `.info`, `.empty` and the badges.
- Changed: inside `StupForm.module.css` the global `.error` class has to be written as `:global(.error)`,
  otherwise CSS Modules renames it and the rule no longer applies.

### 4. A more on-theme interface
Asked: Make the interface look better and closer to the beekeeping theme.
- Got: honeycomb background (an SVG in `index.css`), a honey-coloured header with drips, hexagon
  icons through `clip-path`, stat tiles and a honeycomb progress bar on the list page, a new
  `PutereMeter` component (1–3 filled hexagons) and the hive frames drawn on the detail page.
- Then: a banner with today's date and how many hives still need inspecting, search plus status
  filters (`FiltruBar`, the filtered list is derived, not kept in state), cards that slide in one
  after another, and a `Toast` after add/delete that hides itself after 3 seconds.
- Changed: the strength colours were swapped so they make sense for a beekeeper: a strong colony is
  green and a weak one red. The `data-testid` attributes and the logic stayed the same.

## What I learned / what did not work
`<Link>` changes only the address and React draws the right page, so no HTML document is requested.
`useParams()` always returns text. In CSS Modules every class is local unless marked with `:global`.
