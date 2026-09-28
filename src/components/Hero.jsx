import { useState, useEffect } from "react";
import LanyardCard from "./LanyardCard.jsx";

const endings = [
  "die begeistern.",
  "die wirken.",
  "die bleiben."
];

const ROTATE_MS = 2800;
const FADE_MS = 400;

const Hero = ({ loaded }) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

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

  // Einblenden erst, wenn der Loader weg ist – sonst läuft die Animation unsichtbar ab.
  const fadeIn = loaded ? "animate-fade-in-up" : "opacity-0";

  return (
    <section
      id="home"
      className="relative flex items-center overflow-hidden min-h-svh bg-white dark:bg-zinc-950"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      {/* Ambient glow blobs */}
      <div className="absolute rounded-full pointer-events-none top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl" />
      <div className="absolute w-64 h-64 rounded-full pointer-events-none bottom-1/3 left-1/4 bg-sky-500/8 blur-3xl" />

      {/* Kevins Karte – kürzeres Band, weiter links */}
      <div
        className="absolute top-0 z-10 hidden lg:block"
        style={{ right: "20%" }}
      >
        <LanyardCard
          ready={loaded}
          name="Kevin"
          role="Full-Stack Developer"
          photo="/assets/img/img_kevin.webp"
          delay={0}
        />
      </div>

      {/* Robins Karte – längeres Band, weiter rechts */}
      <div
        className="absolute top-0 z-10 hidden lg:block"
        style={{ right: "5%" }}
      >
        <LanyardCard
          stringHeight="46vh"
          ready={loaded}
          name="Robin"
          role="Full-Stack Developer"
          photo="/assets/img/img_robin.webp"
          delay={0.25}
        />
      </div>

      <div className="container relative z-10 pt-24 pb-24">
        {/* Availability badge */}
        <div className={`flex items-center gap-2 mb-8 w-fit ${fadeIn}`}>
          <span className="relative flex w-2 h-2" aria-hidden="true">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm tracking-wide text-zinc-600 dark:text-zinc-400">
            Verfügbar für neue Projekte
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-[2.75rem] sm:text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 dark:text-white leading-[1.05] tracking-tight mb-6 ${fadeIn}`}
          style={{ animationDelay: "0.1s" }}
        >
          Digitale Projekte,
          <br />
          <span className="sr-only">{endings.join(" ")}</span>
          <span
            className="transition-opacity duration-300 text-sky-400"
            style={{ opacity: visible ? 1 : 0 }}
            aria-hidden="true"
          >
            {endings[index]}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className={`max-w-xl mb-10 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 ${fadeIn}`}
          style={{ animationDelay: "0.2s" }}
        >
          Wir sind Kevin & Robin, zwei Full-Stack Webentwickler aus dem Aargau.
          Wir entwickeln durchdachte Webanwendungen, die nicht nur gut aussehen, sondern Prozesse vereinfachen,
          skalieren und echten Mehrwert schaffen.
        </p>

        {/* CTA buttons */}
        <div
          className={`flex flex-wrap gap-4 ${fadeIn}`}
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#work"
            className="px-6 py-3 font-semibold transition-all duration-200 rounded-full bg-sky-400 text-zinc-950 hover:bg-emerald-300 hover:scale-105"
          >
            Projekte ansehen
          </a>
          <a
            href="#contact"
            className="px-6 py-3 font-medium transition-all duration-200 border rounded-full text-zinc-900 border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400 dark:text-white dark:border-white/15 dark:hover:bg-white/5 dark:hover:border-white/30"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </div>

      {/* Scroll indicator — pinned to section bottom */}
      <div
        className={`absolute z-20 -translate-x-1/2 bottom-8 left-1/2 ${fadeIn}`}
        style={{ animationDelay: "0.4s" }}
      >
        <a href="#about" aria-label="Nach unten scrollen">
          <svg
            className="transition-colors duration-200 w-9 h-9 text-zinc-500 animate-bounce hover:text-sky-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
