# Stage 3: AI log

## Tools
- Gemini

## Conversations
- Shared prompt session (Vite React scaffolding, project structure reorganization, cleanup of template files, and JSX migration for BeeLog)

## Key requests
### 1. Project Initialization & Cleanup
Asked: How to initialize Vite inside the frontend/ directory and safely remove default demo assets without breaking imports.
- Got: Step-by-step guidance to set up Vite with React and ESLint, delete unneeded demo files, and redirect main.jsx to import App.css directly.

### 2. App Component JSX Adaptation
Asked: How to display the BeeLog header, dynamic counts, and raw JSON list in App.jsx.
- Got: Component implementation using JSX, computing active hives with filter, and displaying the array using pre and JSON.stringify.

## What I learned / what did not work
I learned how React components render JSX, how variables and expressions are embedded using curly braces, why data arrays should sit outside the component function when static, and how to verify production readiness using npm run build.