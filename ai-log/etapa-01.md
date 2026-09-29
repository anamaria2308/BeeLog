# Stage 1: AI log

## Tools
- Gemini

## Conversations
- Shared prompt session (Brainstorming BeeLog project theme and building Stage 1 mockup)

## Key requests
### 1. Project theme and data structure
Asked: I asked for a unique and simple project theme that complies with the Stage 1 requirements (a list of items with text, boolean, and fixed tags).
- Got: The AI proposed an apiary manager called "BeeLog", tracking beehives with inspection status and colony strength.
- Changed or rejected: I liked the idea and kept the structure, making sure the status maps correctly to "inspected / to inspect" and colony strength has three fixed levels (Puternica, Medie, Slaba).

### 2. HTML layout and responsive CSS
Asked: How to structure the page using semantic HTML tags and CSS Grid/Flexbox as shown in the lab guide.
- Got: Complete HTML and CSS markup with a two-column desktop layout, collapsible single column for mobile (<700px), visible focus states, and a dark mode.
- Changed or rejected: I kept the overall structure but customized the color palette to warm amber/honey tones and verified that all colors use CSS variables instead of hardcoded values.

## What I learned / what did not work
I learned how to set up CSS custom properties in :root to handle dark mode easily through prefers-color-scheme without rewriting styles. I also practiced using CSS Grid for the main layout and Flexbox to space out card elements.