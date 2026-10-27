# Stage 5: AI log

## Tools
- Gemini

## Conversations
- Interactive state in React, controlled checkbox with onChange, immutable deletion with filter, immutable toggle with map, derived counters, and theme toggling with data-theme.

## Key requests
### 1. State Management & Immutability
Asked: How to manage the hive list in App state and update it without mutating the original array.
- Got: useState with STUPI_INITIALI, handleToggle using map with object spread, and handleDelete using filter.

### 2. Event Handling and Props Drilling
Asked: How to pass down toggle and delete callbacks through StupList into StupCard.
- Got: Callback props onToggle and onDelete, controlled checkbox pattern with input checked and onChange.

### 3. Theme Toggle Switch
Asked: How to implement manual dark/light theme switching with a button in the header.
- Got: App state tracking the theme, dataset.theme writing to documentElement, and CSS selectors supporting both system preferences and user overrides.

## What I learned / what did not work
I learned why React requires arrow functions for inline event handlers (to avoid executing on render), why state should not be mutated directly, and how derived values keep UI statistics in sync without redundant state.