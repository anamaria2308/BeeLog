# Stage 6: AI log

## Tools
- Gemini

## Conversations
- Moving local state to json-server mock API, asynchronous data fetching with useEffect and fetch, handling loading, error, and success states, and environmental variable configuration.

## Key requests
### 1. Mock API Setup
Asked: How to configure json-server to serve the hive list at /stupi.
- Got: Installed json-server@0.17.4, created db.json with initial items, and added "api" script to package.json.

### 2. Dedicated API Module
Asked: How to isolate fetch calls and read the server URL dynamically.
- Got: frontend/src/api.js using import.meta.env.VITE_API_URL and .env.example documentation.

### 3. useEffect and Loading/Error Lifecycle
Asked: How to manage loading and error states in App.jsx safely without memory leaks.
- Got: useEffect with empty dependency array, load async function with try/catch/finally, and cleanup flag (ignore) to prevent state updates on unmounted component.

## What I learned / what did not work
I learned how useEffect lifecycle handles API requests, why checking res.ok is necessary when using fetch, and the purpose of the ignore pattern for cleanup during React StrictMode double invocations.