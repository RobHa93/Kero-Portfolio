<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

## Kero Portfolio - React + Vite + Tailwind CSS

This is a single-page portfolio application built with React, Vite, and Tailwind CSS.

### Project Setup Checklist

- [x] Create copilot-instructions.md file
- [x] Get project setup information
- [x] Scaffold Vite + React project
- [x] Install and configure Tailwind CSS v4
- [x] Fix component imports and structure
- [x] Test compilation and verify setup
- [x] Create and run dev server task
- [x] Finalize documentation

### Project Requirements

- Framework: React with Vite
- Styling: Tailwind CSS v4
- Type: Single Page Application (Portfolio)
- Purpose: Portfolio website for two brothers

### Development Guidelines

- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for all styling
- Keep components modular and reusable
- All imports must use `.jsx` extension

### Project Structure

```
src/
  ├── components/     (UI components: Navbar, Hero, About, Skill, etc.)
  ├── pages/          (Page sections: Work, Contact, Review, etc.)
  ├── assets/         (Static assets)
  ├── App.jsx         (Main application component)
  ├── main.jsx        (Entry point)
  └── index.css       (Global styles with Tailwind CSS v4)
```

### Running the Project

- Dev server: `npm run dev` (runs on http://localhost:5173/)
- Build: `npm run build`
- Preview: `npm run preview`

### Note

- Tailwind CSS v4 uses `@import "tailwindcss"` instead of `@tailwind` directives
- PostCSS uses `@tailwindcss/postcss` plugin
