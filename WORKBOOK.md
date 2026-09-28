# Workbook – KeRo Portfolio

Code-Analyse mit Aufgaben zu **Clean Code** und **Fehlerbehebung**.
Stand: 24.09.2026 · Basis: Commit `ae85660` · Umsetzung: 28.09.2026

---

## 0. Ausgangslage

| Prüfung | Ergebnis |
|---|---|
| `npm run build` | ✅ läuft durch (JS 228 kB / CSS 44 kB) |
| `npm run lint` | ⚠️ 0 Fehler, **1 Warnung** (`LoadingOverlay.jsx:65`) |
| Toter Code | 7 ungenutzte Dateien, 18 ungenutzte Bilder (~3,5 MB) |
| Echte Laufzeit-Bugs | 6 (siehe Kapitel 1) |

Der Build ist grün. Die Probleme liegen vor allem **zur Laufzeit** (Timer-Leak, möglicher Absturz beim Laden, Weissblitz beim Theme) und in **dupliziertem und totem Code**.

### Legende

- **P1** – Bug, sichtbarer Fehler oder Absturzrisiko → zuerst beheben
- **P2** – Clean Code: Duplikate, toter Code, unklare Struktur
- **P3** – Qualität: Performance, Barrierefreiheit (A11y), SEO, Inhalt

Jede Aufgabe hat eine Checkbox `[ ]`. Abhaken, sobald das **Akzeptanzkriterium** erfüllt ist.

### Empfohlene Reihenfolge

1. Kapitel 1 (Bugs) – kleine Änderungen, grosse Wirkung
2. Kapitel 2 (Aufräumen) – danach ist der Code viel übersichtlicher
3. Kapitel 3 (Clean Code / Refactoring)
4. Kapitel 4 (EmailJS)
5. Kapitel 5 (Qualität) und Kapitel 6 (Projekt-Meta)

Nach jedem Kapitel: `npm run lint` und `npm run build` ausführen, danach im Browser (Light- und Dark-Mode, Mobile und Desktop) testen und committen.

### Umsetzungsstand (28.09.2026)

Erledigt sind die Kapitel 1–3, 5.1–5.3 und 6.1–6.4. Danach gilt: `npm run lint` meldet **0 Probleme**, `npm run build` ist grün, und die Seite wurde per Screenshot auf 375 / 768 / 1440 px in Light und Dark geprüft (keine horizontale Überbreite, keine JS-Fehler, alle Bilder laden).

Zusätzlich zur Analyse umgesetzt (aus dem Mobile-Test):
- Preiskarten auf Tablet (768 px) waren zu schmal → erst ab `lg` dreispaltig
- Express.js-Icon im Dark-Mode unsichtbar → `dark:invert`
- Formularfelder mit 16 px Schrift auf Mobile (sonst zoomt iOS beim Antippen hinein)
- Tap-Flächen der Navbar-Buttons 44 × 44 px, `min-h-svh` statt `100vh`, `scroll-padding-top` für die fixe Navbar
- Kleinere Überschriften und weniger Sektionsabstand auf Mobile
- Stats „4+ Projekte / 3+ Jahre“ entfernt, Go im Tech-Stack ergänzt
- Bilder: ~10,7 MB PNG → ~210 kB WebP
- Neues Bild `code-to-product.webp` (111 kB) in „Über uns“: generiert aus eigenem Code (`useTheme.js`, `Hero.jsx`) und einem Screenshot der eigenen Seite, also ohne fremde Bildrechte

**Noch offen:**
- Kapitel 4 – EmailJS (Formular läuft bis dahin weiter über Formspree, siehe `FORM_ENDPOINT` in `Contact.jsx`)
- 3.5 – Daten in `src/data/` auslagern (optional)
- 3.6 – Jährlich = 12 × monatlich: Rabatt oder Toggle entfernen? (inhaltliche Entscheidung)
- 5.4 – Link `https://Keroweb-test.ch` bei Langenfeld Garage prüfen
- 5.5 – SEO (og:image 1200 × 630, `lastmod`, Lighthouse nach Deploy)
- 6.5 – Prettier (optional)
- `public/assets/img/img_robin1.png` ist neu und wird nicht verwendet: ersetzen oder löschen?
- Desktop 1440 px: Kevins Karte überdeckt leicht das Komma von „Projekte,“

---

## 1. Fehler beheben (P1)

### 1.1 [x] Timer-Leak im Hero-Textwechsel

**Datei:** [src/components/Hero.jsx:15-25](src/components/Hero.jsx#L15-L25)

**Problem:** Das `return () => clearTimeout(t)` steht *innerhalb* des `setInterval`-Callbacks. Ein Rückgabewert eines Interval-Callbacks wird von niemandem aufgerufen. Der Timeout wird also beim Unmount nie gelöscht. (Der Commit `b914672` nennt diesen Leak als behoben, er ist aber noch da.)

```js
// ❌ aktuell
const interval = setInterval(() => {
  setVisible(false);
  const t = setTimeout(() => { ... }, 400);
  return () => clearTimeout(t);   // wird nie ausgeführt
}, 2800);
return () => clearInterval(interval);
```

**Lösung:**

```js
const ROTATE_MS = 2800;
const FADE_MS = 400;

useEffect(() => {
  let timeoutId;
  const intervalId = setInterval(() => {
    setVisible(false);
    timeoutId = setTimeout(() => {
      setIndex((prev) => (prev + 1) % endings.length);
      setVisible(true);
    }, FADE_MS);
  }, ROTATE_MS);

  return () => {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  };
}, []);
```

**Akzeptanz:** Beide Timer werden im Cleanup gelöscht. Keine Magic Numbers mehr im Effect.

---

### 1.2 [x] App stürzt ab, wenn `sessionStorage` blockiert ist

**Datei:** [src/components/LoadingOverlay.jsx:12](src/components/LoadingOverlay.jsx#L12) und [:57](src/components/LoadingOverlay.jsx#L57)

**Problem:** In manchen Browsern wirft `sessionStorage.getItem()` eine Exception, z. B. wenn Cookies und Websitedaten blockiert sind oder bei eingebetteten iFrames. Weil der Aufruf im `useState`-Initializer steht, bleibt die **ganze Seite weiss**.

**Lösung:** Einen kleinen Helper schreiben, z. B. `src/utils/storage.js`:

```js
export const safeStorage = {
  get(storage, key) {
    try { return storage.getItem(key); } catch { return null; }
  },
  set(storage, key, value) {
    try { storage.setItem(key, value); } catch { /* ignore */ }
  },
};
```

```js
const [visible] = useState(() => safeStorage.get(sessionStorage, SESSION_KEY) !== "1");
```

**Akzeptanz:** Die Seite lädt auch mit blockiertem Storage. Test: DevTools → Application → Storage → „Clear site data“ und Cookies blockieren.

---

### 1.3 [x] ESLint-Warnung und Timer-Verwaltung im LoadingOverlay

**Datei:** [src/components/LoadingOverlay.jsx:21-68](src/components/LoadingOverlay.jsx#L21-L68)

**Probleme:**
- `timersRef` ist unnötig und löst die Lint-Warnung aus. Ausserdem wird das Array nie geleert: Im StrictMode läuft der Effect zweimal, und die Timer-IDs sammeln sich an.
- `// eslint-disable-line react-hooks/exhaustive-deps` versteckt die Abhängigkeit `onDone`.
- `phase < 3` und `setPhase(3)` sind Magic Numbers. Der Kommentar „Phrases 0-2 (Hallo!, Kevin, Robin)“ stimmt nicht mehr, denn es gibt nur noch **2** Phrasen.

**Lösung:**

```js
const MERGE_PHASE = PHRASES.length; // Phase nach der letzten Phrase

useEffect(() => {
  if (!visible) { onDoneRef.current?.(); return; }

  const timers = [];
  const schedule = (fn, ms) => timers.push(setTimeout(fn, ms));
  // ... schedule(...) statt push(...)

  return () => {
    timers.forEach(clearTimeout);
    document.body.style.overflow = "";
  };
}, [visible]);
```

Für `onDone` eine Ref verwenden, damit der Effect nicht neu startet:

```js
const onDoneRef = useRef(onDone);
useEffect(() => { onDoneRef.current = onDone; }, [onDone]);
```

**Akzeptanz:** `npm run lint` zeigt **0 Warnungen**. Kein `eslint-disable` mehr. `phase < MERGE_PHASE` statt `phase < 3`.

---

### 1.4 [x] Weisser Blitz und vergessenes Theme beim Dark-/Light-Mode

**Dateien:** [src/App.jsx:16-24](src/App.jsx#L16-L24), [index.html:2](index.html#L2)

**Probleme:**
1. Die Klasse `dark` wird erst gesetzt, **nachdem React gerendert hat**. Bis dahin ist `html` weiss, und man sieht einen Weissblitz (der Kommentar in `index.css:13` will genau das verhindern).
2. Die Wahl wird nicht gespeichert. Nach einem Reload ist man wieder im Dark-Mode.
3. `prefers-color-scheme` des Systems wird ignoriert.

**Lösung:**

a) Inline-Script **im `<head>`** von `index.html`, vor allen Styles:

```html
<script>
  try {
    const saved = localStorage.getItem("theme");
    const dark = saved ? saved === "dark"
      : !window.matchMedia("(prefers-color-scheme: light)").matches;
    document.documentElement.classList.toggle("dark", dark);
  } catch { document.documentElement.classList.add("dark"); }
</script>
```

b) Einen Hook `src/hooks/useTheme.js` erstellen:

```js
import { useEffect, useState } from "react";
import { safeStorage } from "../utils/storage.js";

export function useTheme() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    safeStorage.set(localStorage, "theme", isDark ? "dark" : "light");
  }, [isDark]);

  return { isDark, toggleTheme: () => setIsDark((d) => !d) };
}
```

In `App.jsx` dann nur noch: `const { isDark, toggleTheme } = useTheme();`

**Akzeptanz:** Kein Weissblitz beim Reload im Dark-Mode. Das Theme bleibt nach einem Reload erhalten.

---

### 1.5 [x] Hero-Einblendanimationen laufen unsichtbar ab

**Datei:** [src/components/Hero.jsx:70-129](src/components/Hero.jsx#L70-L129) zusammen mit [src/App.jsx:31-36](src/App.jsx#L31-L36)

**Problem:** Die Hero-Elemente haben `animate-fade-in-up` (0,7 s). Diese Animation startet sofort beim Mount. Der Loader verdeckt die Seite aber rund 4 s lang, und der Wrapper hat `opacity: 0`. Wenn die Seite sichtbar wird, ist die Animation längst vorbei.

**Lösung:** So wie bei `LanyardCard`: Die Klasse erst setzen, wenn `loaded` true ist.

```jsx
const fadeIn = loaded ? "animate-fade-in-up" : "opacity-0";
<div className={`flex items-center gap-2 mb-8 w-fit ${fadeIn}`}>
```

**Akzeptanz:** Nach dem Loader sieht man Badge, Titel, Text und Buttons gestaffelt einfliegen.

---

### 1.6 [x] Trennlinien in der Tech-Stack-Sektion unsichtbar (Light-Mode)

**Datei:** [src/components/Skill.jsx:80](src/components/Skill.jsx#L80)

**Problem:** `divide-white/5` ist auf weissem Hintergrund unsichtbar.

**Lösung:** `divide-zinc-200 dark:divide-white/5`

**Akzeptanz:** Die Linien zwischen den Kategorien sind in beiden Modi sichtbar.

---

### 1.7 [x] Kleine Fehler in `LanyardCard`

**Datei:** [src/components/LanyardCard.jsx](src/components/LanyardCard.jsx)

| Zeile | Problem | Lösung |
|---|---|---|
| [5](src/components/LanyardCard.jsx#L5) | Default `"/assets/img/Foto.png"` **existiert nicht** | Default entfernen, `photo` als Pflicht-Prop |
| [45](src/components/LanyardCard.jsx#L45) | `text-s` ist keine Tailwind-Klasse (Tippfehler) | `text-sm` |
| [14](src/components/LanyardCard.jsx#L14) | `transformOrigin` doppelt (steht schon in `.swing-in`) | Inline-Style entfernen |
| [42](src/components/LanyardCard.jsx#L42) | Text „kero.dev“, die Domain ist aber `kero-web.ch` | vereinheitlichen |
| [1](src/components/LanyardCard.jsx#L1) | Prop heisst `photo1`, es gibt kein `photo2` | umbenennen in `photo` |

---

### 1.8 [x] CSS: doppelte und ungültige Regeln

**Datei:** [src/index.css](src/index.css)

| Zeile | Problem |
|---|---|
| [41-44](src/index.css#L41-L44) + [103-111](src/index.css#L103-L111) | `.section` ist **zweimal** definiert. Die zweite Definition überschreibt `padding-top`, deshalb gilt effektiv `5rem / 8rem` oben und `6rem` unten. Beide zu einem Block zusammenführen. |
| [129](src/index.css#L129) | `-webkit-radial-gradient(0deg …)` ist ungültig, denn radiale Gradienten haben keinen Winkel. Die Klasse wird ohnehin nicht genutzt (siehe 2.3). |
| [21-39](src/index.css#L21-L39) | Die eigene `.container`-Klasse **mischt sich mit der eingebauten Tailwind-v4-Utility `container`**. Im Build stehen beide, und die max-width-Werte widersprechen sich. In Tailwind v4 so anpassen: |

```css
@utility container {
  margin-inline: auto;
  padding-inline: 1rem;
  @media (width >= 64rem) { padding-inline: 2rem; }
  @media (width >= 80rem) { max-width: 72rem; }
}
```

```css
.section {
  padding-top: 5rem;
  padding-bottom: 6rem;
}
@media (min-width: 1024px) {
  .section { padding-top: 8rem; }
}
```

**Akzeptanz:** Jede Klasse existiert nur einmal. Das Layout sieht vorher und nachher gleich aus (Screenshots vergleichen).

---

## 2. Aufräumen: toter Code (P2)

> Regel: Code, der nicht verwendet wird, wird gelöscht. Git merkt sich alles, was man später wieder braucht.

### 2.1 [x] Ungenutzte Dateien löschen

Keine dieser Dateien wird irgendwo importiert:

| Datei | Grund |
|---|---|
| [src/index.jsx](src/index.jsx) | Überbleibsel von Create-React-App. Importiert `reportWebVitals`, das es nicht gibt. **Würde beim Import crashen.** Einstiegspunkt ist `main.jsx`. |
| [src/App.css](src/App.css) | Vite-Template-CSS, nirgends importiert |
| [src/pages/Home.jsx](src/pages/Home.jsx) | Platzhalter |
| [src/pages/Review.jsx](src/pages/Review.jsx) | Platzhalter (Dateiname `Review`, Komponente `Reviews`) |
| [src/components/Services.jsx](src/components/Services.jsx) | ersetzt durch `HowWeWork.jsx`, nur Dark-Mode-Styles |
| [src/components/SkillCard.jsx](src/components/SkillCard.jsx) | ersetzt durch die Pills in `Skill.jsx` |
| [src/components/button.jsx](src/components/button.jsx) | ungenutzt, ausserdem kleingeschrieben (Komponenten-Dateien in PascalCase) |
| [tailwind.config.js](tailwind.config.js) | Tailwind v4 **ignoriert** diese Datei (Konfiguration läuft über CSS) |

> Falls `Services.jsx` oder `Review.jsx` noch geplant sind: in einen Branch auslagern, statt sie tot in `main` liegen zu lassen.

### 2.2 [x] Ungenutzte Bilder löschen (~3,5 MB)

In `public/assets/img/` werden diese Dateien nicht referenziert:

`usluzern.jpg` (2,6 MB), `learn-by-doing.png`, `shop.jpg`, `study-coding.png`, `img_robin.jpeg`, `renault.jpg`, `netflix.jpg`, `tic-tac-toe.jpg`, `heroplaceholder.png`, `logo.svg`, `css3.svg`, `expressjs.svg`, `figma.svg`, `javascript.svg`, `mongodb.svg`, `nodejs.svg`, `react.svg`, `tailwindcss.svg`

Mit diesem Befehl nachprüfen:

```bash
for f in public/assets/img/*; do b=$(basename "$f"); grep -rq "$b" src index.html || echo "UNUSED $b"; done
```

### 2.3 [x] Ungenutzte CSS-Klassen entfernen

In [src/index.css](src/index.css) wird Folgendes von keiner Komponente verwendet (oder nur von gelöschten):
`.animate-marquee` samt `@keyframes marquee`, `.img-box`, `.img-cover`, `.headline-1`, `.headline-2`, `.btn`, `.btn-primary`, `.btn-outline` und `.btn .material-symbols-rounded`.
Der Abschnitt „Legacy helpers“ kann komplett weg.

### 2.4 [x] Ungenutzte externe Ressourcen und Pakete entfernen

| Wo | Was | Warum |
|---|---|---|
| [index.html:33](index.html#L33) | Google Material Symbols | wird nur von `button.jsx` benutzt, ist gross und blockiert das Rendern |
| [index.html:35](index.html#L35) | Devicon-**Stylesheet** | Die Icons kommen als `<img>` direkt als SVG. Das CSS (Icon-Font) wird nie genutzt. |
| `package.json` | `prop-types` | nur in gelöschten Komponenten verwendet |
| `package.json` | `autoprefixer` | in Tailwind v4 eingebaut, nicht in `postcss.config.js` eingetragen |

```bash
npm uninstall prop-types autoprefixer
```

**Akzeptanz Kapitel 2:** `npm run build` ist grün, die Seite sieht unverändert aus, und es gibt weniger Netzwerk-Requests (DevTools → Network).

---

## 3. Clean Code / Refactoring (P2)

### 3.1 [x] Komponente `SectionLabel` (DRY)

Der gleiche Block kommt **5-mal** vor: About, HowWeWork, Skill, Work, Contact.

```jsx
<div className="flex items-center gap-3 mb-12">
  <div className="w-8 h-px bg-sky-400" />
  <span className="text-sm font-medium tracking-widest uppercase text-sky-400">…</span>
</div>
```

**Lösung:** `src/components/SectionLabel.jsx`

```jsx
const SectionLabel = ({ children, className = "mb-12" }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-8 h-px bg-sky-400" aria-hidden="true" />
    <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
      {children}
    </span>
  </div>
);
export default SectionLabel;
```

Man könnte auch eine `Section`-Komponente bauen (`<section>` + `container` + Label + Titel). Das würde nochmals ~10 Zeilen pro Sektion sparen.

### 3.2 [x] Komponente `ThemeToggle` in der Navbar

[src/components/Navbar.jsx:63-69](src/components/Navbar.jsx#L63-L69) und [:81-87](src/components/Navbar.jsx#L81-L87) sind fast identisch (Button, aria-label, Icons). Daraus eine Komponente `ThemeToggle` machen.

Zusätzlich in der Navbar:
- [x] Hamburger: `aria-label="Toggle menu"` ist Englisch → „Menü öffnen“ / „Menü schliessen“
- [x] Hamburger: `aria-expanded={menuOpen}` und `aria-controls="mobile-menu"` ergänzen
- [x] `setMenuOpen(!menuOpen)` ersetzen durch `setMenuOpen((open) => !open)`
- [x] Scroll-Listener mit `{ passive: true }` registrieren (gilt auch für [ScrollToTop.jsx:9](src/components/ScrollToTop.jsx#L9))
- [x] Optional: Navigationspunkt „Preise“ (`#pricing`) ergänzen. Die Sektion existiert, ist aber nicht verlinkt.

### 3.3 [x] Duplizierte Klassen im Kontaktformular

[src/pages/Contact.jsx:37](src/pages/Contact.jsx#L37), [:44](src/pages/Contact.jsx#L44), [:52](src/pages/Contact.jsx#L52): Derselbe ~250 Zeichen lange `className` steht dreimal. Er gehört in eine Konstante `const inputClass = "…"`. Das wird beim EmailJS-Umbau (Kapitel 4) ohnehin erledigt.

### 3.4 [x] `key={idx}` in der Projektliste

[src/pages/Work.jsx:92](src/pages/Work.jsx#L92): Den Index als Key zu verwenden ist ein Anti-Pattern. Besser `key={project.title}` oder ein `id`-Feld.

### 3.5 [ ] Daten von Darstellung trennen

Die Datenarrays (`works`, `tiers`, `skillCategories`, `principles`, `services`) stehen oben in den Komponenten. Das ist für diese Grösse okay. Sauberer ist ein Ordner `src/data/` (z. B. `projects.js`, `pricing.js`, `skills.js`). Dann kann man Inhalte ändern, ohne JSX anzufassen.

In [About.jsx:46-49](src/components/About.jsx#L46-L49) ist das Stats-Array inline im JSX definiert. Es gehört als Konstante über die Komponente.

### 3.6 [x] Duplizierte Daten in `Pricing`

[src/pages/Pricing.jsx:8-9, 25-26, 43-44](src/pages/Pricing.jsx#L8-L9): `setupOnepager` und `setupMultipager` sind bei allen drei Tarifen **identisch**. Das gehört in eine Konstante und wird einmal oberhalb der Karten angezeigt.

Ausserdem:
- [x] Die zwei Toggle-Buttons ([:96-115](src/pages/Pricing.jsx#L96-L115)) sind dupliziert. Besser `[{ id: "monthly", label: "Monatlich" }, …].map(...)`.
- [x] `type="button"` und `aria-pressed={billing === id}` ergänzen
- [x] Beschriftung vereinheitlichen: „Setup Singlepage:“ und „Setup Multipager (bis 5 Seiten):“ (bei Multipager steht der Doppelpunkt an anderer Stelle)
- [ ] Inhaltliche Frage: Jährlich ist genau 12 × monatlich, es gibt keinen Rabatt. Damit bringt der Toggle wenig. Entweder einen Rabatt einführen oder den Toggle entfernen.

### 3.7 [x] Irreführende Kommentare korrigieren

| Datei | Kommentar | Realität |
|---|---|---|
| [Hero.jsx:39, 53](src/components/Hero.jsx#L39) | „upper, more left“ / „lower, more right“ | Beide Karten haben `top-0`. Der Unterschied kommt von `stringHeight`. |
| [About.jsx:14](src/components/About.jsx#L14) | „Left - text & stats“ | Es gibt nur eine Spalte (`md:grid-cols-1`, auch überflüssig) |
| [LoadingOverlay.jsx:33, 43](src/components/LoadingOverlay.jsx#L33) | „Phrases 0-2 (Hallo!, Kevin, Robin)“, „After Robin“ | Es gibt 2 Phrasen, „Robin“ ist keine eigene Phrase |
| [pages/Home.jsx:1](src/pages/Home.jsx#L1) | `// Home.js` | Datei heisst `.jsx` (Datei wird ohnehin gelöscht) |

### 3.8 [x] Tailwind-Klassen vereinheitlichen

- `flex-shrink-0` (v3-Name) und `shrink-0` (v4-Name) werden gemischt → überall `shrink-0`
- `bg-gradient-to-b` ([LanyardCard.jsx:18](src/components/LanyardCard.jsx#L18)) → `bg-linear-to-b` wie in `Work.jsx`
- Formatierung: VS Code-Extension „Prettier“ mit `prettier-plugin-tailwindcss` sortiert die Klassen automatisch

### 3.9 [x] Lange Absätze mit `<br /><br />` aufteilen

[src/components/About.jsx:19-42](src/components/About.jsx#L19-L42): Ein einziges `<p>` mit 8× `<br />` ist semantisch falsch. Stattdessen ein Array aus Absätzen und `.map()` auf einzelne `<p>`-Elemente.

---

## 4. Kontaktformular mit EmailJS (P1)

Aktuell schickt das Formular per `action="https://formspree.io/f/mayvldwp"` an **Formspree**. Die Seite verlässt dabei die Website, und es gibt kein Feedback. Umstellung auf EmailJS:

### 4.1 [ ] EmailJS-Konto einrichten (Dashboard)

1. Auf [emailjs.com](https://www.emailjs.com/) registrieren
2. **Email Services** → Service hinzufügen (z. B. Gmail oder SMTP des eigenen Mail-Anbieters) → **Service ID** notieren
3. **Email Templates** → Template erstellen. Die Variablen müssen **genau gleich heissen wie die `name`-Attribute** im Formular:
   ```
   Betreff: Neue Anfrage von {{name}}
   Von: {{name}} <{{email}}>
   Reply-To: {{email}}

   {{message}}
   ```
   → **Template ID** notieren
4. **Account → General** → **Public Key** notieren
5. **Account → Security**: bei *Allowed origins* `https://kero-web.ch` (und für Tests `http://localhost:5173`) eintragen. Sonst kann jeder den Public Key missbrauchen.
6. Optional: unter *Security* reCAPTCHA oder ein Rate-Limit aktivieren

### 4.2 [ ] Paket und Umgebungsvariablen

```bash
npm install @emailjs/browser
```

`.env.local` (**nicht** committen, `*.local` ist bereits in `.gitignore`):

```
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxx
```

`.env.example` (committen, als Vorlage):

```
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

> Der Public Key ist *öffentlich* und landet im Bundle. Das ist bei EmailJS so gewollt. Die Absicherung läuft über *Allowed origins* (Schritt 4.1.5).
> Auf dem Hosting (Netlify, Vercel, Render …) dieselben drei Variablen im Dashboard setzen. Vite liest sie **beim Build** ein.

### 4.3 [ ] `Contact.jsx` umbauen

`inputClass`, Labels und `SectionLabel` sind schon umgesetzt. Beim Umstellen wird `action={FORM_ENDPOINT}` durch `onSubmit` ersetzt:

```jsx
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionLabel from "../components/SectionLabel.jsx";

const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;

const inputClass =
  "px-4 py-3 text-base sm:text-sm text-zinc-900 transition-all duration-200 border bg-zinc-50 border-zinc-200 " +
  "placeholder:text-zinc-400 rounded-xl focus:outline-none focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 " +
  "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-500";

const STATUS_MESSAGES = {
  success: "Danke! Deine Nachricht ist bei uns angekommen.",
  error: "Das hat leider nicht geklappt. Bitte versuche es später nochmals.",
};

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;

    // Honeypot: Bots füllen versteckte Felder aus
    if (form.elements.website.value) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, form, {
        publicKey: VITE_EMAILJS_PUBLIC_KEY,
      });
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("EmailJS:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section bg-white dark:bg-zinc-950">
      <div className="container">
        <SectionLabel>Kontakt</SectionLabel>
        {/* … linke Spalte unverändert … */}

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate={false}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="sr-only" htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name"
                   placeholder="Dein Name" required className={inputClass} />

            <label className="sr-only" htmlFor="contact-email">E-Mail</label>
            <input id="contact-email" name="email" type="email" autoComplete="email"
                   placeholder="Deine E-Mail" required className={inputClass} />
          </div>

          <label className="sr-only" htmlFor="contact-message">Nachricht</label>
          <textarea id="contact-message" name="message" rows={6} required
                    placeholder="Deine Nachricht..." className={`${inputClass} resize-none`} />

          {/* Honeypot – für Menschen unsichtbar */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off"
                 className="hidden" aria-hidden="true" />

          <button type="submit" disabled={status === "sending"}
                  className="w-full px-6 py-3 font-semibold transition-colors duration-200 bg-sky-400 text-zinc-950 rounded-xl hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-wait sm:w-auto sm:self-start">
            {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
          </button>

          <p role="status" aria-live="polite"
             className={`text-sm ${status === "error" ? "text-red-500" : "text-emerald-500"}`}>
            {STATUS_MESSAGES[status] ?? ""}
          </p>
        </form>
      </div>
    </section>
  );
};

export default Contact;
```

### 4.4 [ ] Testfälle EmailJS

- [ ] Gültige Eingabe → Erfolgsmeldung, Formular wird geleert, Mail kommt an, *Antworten* geht an die Absender-Adresse
- [ ] Leere Felder oder ungültige E-Mail → Browser-Validierung greift, es wird nichts gesendet
- [ ] Netzwerk offline (DevTools → Network → Offline) → Fehlermeldung, Eingaben bleiben erhalten
- [ ] Doppelklick auf „Senden“ → nur **eine** Mail (Button ist während des Sendens deaktiviert)
- [ ] Honeypot-Feld per DevTools befüllen → es wird nichts gesendet
- [ ] Production-Build (`npm run build && npm run preview`) → die Variablen sind gesetzt, der Versand funktioniert
- [ ] Formspree-Formular im Formspree-Dashboard deaktivieren

---

## 5. Qualität: Performance, A11y, SEO, Inhalt (P3)

### 5.1 [x] Bilder optimieren

| Bild | Grösse | Anzeige |
|---|---|---|
| `galloway_homepage.png` | 2,5 MB | 400 × 192 px Kachel |
| `img_kevin.png` / `img_robin.png` | je 2,1 MB | 264 px breite Karte |
| `lfg_homepage.png` | 1,4 MB | Kachel |
| `autofire_homepage.png` | 1,0 MB | Kachel |

→ In **WebP** konvertieren und auf ~800 px Breite skalieren (z. B. mit [squoosh.app](https://squoosh.app)). Ziel ist **< 150 kB pro Bild**. Allein das spart etwa 9 MB.
→ `width`/`height` bei den `<img>` angeben, damit das Layout beim Laden nicht springt (CLS).

### 5.2 [x] Barrierefreiheit

- [x] **Kontrast:** `text-zinc-600` auf `zinc-950` hat ein Verhältnis von ca. 2,6 : 1 (WCAG verlangt 4,5 : 1). Betrifft [Footer.jsx:6, 9](src/components/Footer.jsx#L6), [Pricing.jsx:188](src/pages/Pricing.jsx#L188), [Pricing.jsx:180](src/pages/Pricing.jsx#L180) → im Dark-Mode `dark:text-zinc-400` verwenden
- [x] **Reduzierte Bewegung:** Loader, Swing-In, Bounce und Textwechsel für Nutzer mit `prefers-reduced-motion: reduce` abschalten:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  ```
- [x] **Deko-SVGs** (Icons in Work, HowWeWork, Pricing) mit `aria-hidden="true"` markieren
- [x] **Hero-Textwechsel:** Screenreader lesen den Wechsel alle 2,8 s nicht sinnvoll vor. `aria-hidden` an den wechselnden Teil hängen und eine statische `sr-only`-Variante ergänzen.
- [x] **Skip-Link** „Zum Inhalt springen“ und `<main>` um die Sektionen (aktuell nur ein `<div>` in [App.jsx:31](src/App.jsx#L31))

### 5.3 [x] Externe Abhängigkeiten stabilisieren

- `devicon@latest` ([Skill.jsx:1](src/components/Skill.jsx#L1)): Eine neue Version kann Icon-Pfade ändern, dann fehlen die Icons plötzlich. **Version pinnen**, z. B. `devicon@2.16.0`, oder die benötigten SVGs lokal in `public/` ablegen (ausserdem besser für den Datenschutz).
- Google Fonts `Inter` wird per CSS-`@import` geladen und blockiert das Rendern. Alternative: `npm i @fontsource-variable/inter` (lokal gehostet, DSGVO/DSG-freundlich).

### 5.4 [ ] Inhalt und Tippfehler

| Datei | Aktuell | Korrektur |
|---|---|---|
| [Work.jsx:30](src/pages/Work.jsx#L30) | „Datenbank integrierung auf neustem Industriellem Standart“ | „Datenbankintegration nach neuestem industriellem Standard“ |
| [Work.jsx:46](src/pages/Work.jsx#L46) | „Reisen- Vorschläge“ | „Reisen – mit Vorschlägen“ |
| [Work.jsx:8](src/pages/Work.jsx#L8) | Link `https://Keroweb-test.ch` | Sieht nach Test-Domain aus → echte URL oder `null` |
| [Work.jsx:15, 31, 42](src/pages/Work.jsx#L15) | Leerzeichen, trailing comma, Einrückung | Prettier laufen lassen |
| [Work.jsx:65](src/pages/Work.jsx#L65) | Fallback-Tag-Farbe nur für Dark-Mode (`bg-zinc-700/50`) | Light-Variante ergänzen |

### 5.5 [ ] SEO

- [ ] `og:image` ([index.html:17](index.html#L17)): Ideal sind 1200 × 630 px. Zusätzlich `og:image:width` und `og:image:height` angeben.
- [ ] `sitemap.xml`: `<lastmod>` ergänzen
- [ ] Nach dem Deploy mit Lighthouse prüfen (Chrome DevTools → Lighthouse). Ziel: alle Kategorien ≥ 90.

---

## 6. Projekt-Meta (P2)

### 6.1 [x] `package.json`

| Feld | Aktuell | Korrektur |
|---|---|---|
| `description` | Vite-Template-Text | echte Beschreibung |
| `main` | `"eslint.config.js"` | **entfernen**, bei einer App unnötig und falsch |
| `author` | `""` | „Kevin & Robin“ |
| `version` | `0.0.0` | z. B. `1.0.0` |
| `license` | `ISC` | bewusst wählen, z. B. `"UNLICENSED"` bei privatem Code |

### 6.2 [x] `.gitignore` widerspricht sich

[.gitignore:2](.gitignore#L2) ignoriert `package-lock.json`, die Datei ist aber **committed**. Der Lockfile **gehört ins Repo**, damit alle dieselben Paketversionen installieren. → Zeile 2 entfernen. Ausserdem ist `node_modules` doppelt eingetragen (Zeilen 1 und 12).

### 6.3 [x] README aufräumen

[README.md:24-39](README.md#L24-L39) ist Text aus dem Vite-Template. Ersetzen durch:
- Setup (`npm install`, `.env.local` nach `.env.example` anlegen)
- Scripts (`dev`, `build`, `lint`, `preview`)
- Projektstruktur
- Deployment
- Hinweis zur EmailJS-Konfiguration

### 6.4 [x] `.github/copilot-instructions.md` aktualisieren

Dort steht, dass es einen Ordner `src/assets/` gibt. Den gibt es nicht, die Bilder liegen in `public/assets/img/`. Neue Konventionen (Hooks, `src/data/`, `SectionLabel`) nachtragen.

### 6.5 [ ] Optional: Prettier einrichten

```bash
npm i -D prettier prettier-plugin-tailwindcss
```

`.prettierrc`:

```json
{ "plugins": ["prettier-plugin-tailwindcss"] }
```

Script in `package.json`: `"format": "prettier --write src"`

---

## 7. Zielstruktur nach dem Refactoring

```
src/
├── components/
│   ├── About.jsx
│   ├── Footer.jsx
│   ├── Hero.jsx
│   ├── HowWeWork.jsx
│   ├── LanyardCard.jsx
│   ├── LoadingOverlay.jsx
│   ├── Navbar.jsx
│   ├── ScrollToTop.jsx
│   ├── SectionLabel.jsx      ← neu
│   ├── Skill.jsx
│   └── ThemeToggle.jsx       ← neu
├── data/                     ← neu (optional)
│   ├── pricing.js
│   ├── projects.js
│   └── skills.js
├── hooks/
│   └── useTheme.js           ← neu
├── pages/
│   ├── Contact.jsx           ← EmailJS
│   ├── Pricing.jsx
│   └── Work.jsx
├── utils/
│   └── storage.js            ← neu
├── App.jsx
├── index.css
└── main.jsx
```

---

## 8. Definition of Done

- [ ] `npm run lint` → **0 Fehler, 0 Warnungen**
- [ ] `npm run build` → erfolgreich
- [ ] Keine ungenutzten Dateien, Imports, CSS-Klassen oder Pakete
- [ ] Kein `eslint-disable` im Code
- [ ] Alle Sektionen in Light- **und** Dark-Mode geprüft
- [ ] Mobile (375 px), Tablet (768 px) und Desktop (1440 px) geprüft
- [ ] Kontaktformular sendet über EmailJS (alle Testfälle aus 4.4 bestanden)
- [ ] Lighthouse: Performance, Accessibility, Best Practices und SEO ≥ 90
- [ ] Jedes Kapitel als eigener Commit (z. B. `fix: timer leak in hero`, `chore: remove dead code`, `feat: emailjs contact form`)
