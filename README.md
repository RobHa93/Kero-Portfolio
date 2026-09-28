# Kero Portfolio

Welcome to the portfolio of Robin & Kevin!

This is our digital portfolio where we showcase selected projects and passion work. As dedicated full-stack web developers, we combine modern frontend design with robust backend architecture. Our goal: smart, creative, and scalable web applications that inspire and deliver real value. From visually appealing homepages to full-featured applications, we strive to bring ideas to life.

We use modern technologies like React, Vite, and Tailwind CSS to create innovative solutions for businesses and private clients. Here, you'll find a selection of our typical work and personal projects.

**Who are we?**

We are Robin and Kevin – two brothers with a strong passion for web development. Together, we turn ideas into reality and help make digital visions come true.

---

## Tech Stack

- [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (configured in `src/index.css`, no `tailwind.config.js`)
- Font: Inter, self-hosted via `@fontsource-variable/inter`

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173/
```

| Script | Purpose |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

## Project Structure

```
public/assets/img/    Images (WebP, max. ~800px wide)
src/
├── components/       UI sections and shared components (SectionLabel, ThemeToggle, …)
├── hooks/            useTheme (dark/light mode, persisted in localStorage)
├── pages/            Work, Pricing, Contact
├── utils/            safeStorage (Web Storage without crashes)
├── App.jsx
├── index.css         Tailwind import, global styles, animations
└── main.jsx          Entry point
```

## Conventions

- Functional components, one component per file, PascalCase file names
- Imports with explicit `.jsx` / `.js` extension
- Section headings use `<SectionLabel>`
- Every colour needs a light **and** a `dark:` variant
- New images: convert to WebP and resize to the displayed size (×2 for retina)

## Contact Form

The form currently posts to Formspree. The switch to EmailJS is described in [WORKBOOK.md](WORKBOOK.md), chapter 4.
