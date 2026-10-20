# Stage 4: AI log

## Tools
- Gemini

## Conversations
- Shared prompt session (React components, props destructuring, dynamic list rendering with map and keys, conditional rendering for BeeLog)

## Key requests
### 1. Component Modularization
Asked: How to split the raw JSON data display into reusable React components (StupCard and StupList) following single-responsibility principles.
- Got: Architecture guidance creating frontend/src/components/StupCard.jsx and frontend/src/components/StupList.jsx, receiving data via props.

### 2. List Rendering & State-based Styling
Asked: How to render hives dynamically, attach unique keys, apply done styles, and handle empty states.
- Got: StupList mapping over stupi using key={stup.id}, early return for empty lists, and dynamic class assignment in StupCard.

## What I learned / what did not work
I learned why React requires a stable key prop (and why indices shouldn't be used), how props flow strictly downwards from App to child components, and how early return simplifies empty list rendering.