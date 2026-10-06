# Stage 2: AI log

## Tools
- Gemini

## Conversations
- Shared prompt session (JavaScript data logic, array methods, and immutability for BeeLog)

## Key requests
### 1. Data logic implementation
Asked: How to write the data logic functions for BeeLog in a separate JavaScript file without modifying the DOM.
- Got: Suggested functions using map, filter, and reduce for listing names, counting active hives, searching, adding with validation, toggling inspection status, and deleting.
- Changed or rejected: Adapted all naming conventions to the beekeeping theme (stupi, PUTERI, comutaInspectat, stergeStup) and ensured proper case-insensitive search with toLowerCase() and includes().

### 2. Immutability and ID calculation
Asked: How to calculate the next ID and ensure the original array remains untouched.
- Got: Implementation using nextId with Array.prototype.reduce and array/object spread syntax [...lista, newHive].
- Changed or rejected: Kept the implementation exactly as suggested to satisfy requirements S2-R4 and S2-R5.

## What I learned / what did not work
I learned why immutability is essential when working with state (preventing in-place mutations like push), how reduce safely determines the highest ID, and how to verify everything cleanly through the browser console.