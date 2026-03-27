
import { useState, useEffect } from "react";

const endings = [
  "die begeistern.",
  "die überzeugen.",
  "die bleiben."
];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // fade out
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % endings.length);
        // fade in
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen overflow-hidden bg-zinc-950"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none grid-bg" />

      {/* Ambient glow blobs */}
      <div className="absolute rounded-full pointer-events-none top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 blur-3xl" />
      <div className="absolute w-64 h-64 rounded-full pointer-events-none bottom-1/3 left-1/4 bg-sky-500/8 blur-3xl" />

      <div className="container relative z-10 pt-24 pb-16">
        {/* Availability badge */}
        <div className="flex items-center gap-2 mb-8 animate-fade-in-up w-fit">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm tracking-wide text-zinc-400">
            Verfügbar für neue Projekte
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
          style={{ animationDelay: "0.1s" }}
        >
          Digitale Projekte,
          <br />
          <span
            className="transition-opacity text-sky-400 duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {endings[index]}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="max-w-xl mb-10 text-lg leading-relaxed animate-fade-in-up text-zinc-400"
          style={{ animationDelay: "0.2s" }}
        >
          Wir sind Robin &amp; Kevin — Full-Stack Webentwickler aus der Schweiz.
          Wir bauen smarte, skalierbare Webanwendungen, die echten Mehrwert
          bieten.
        </p>

        {/* CTA buttons */}
        <div
          className="flex flex-wrap gap-4 animate-fade-in-up"
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
            className="px-6 py-3 font-medium text-white transition-all duration-200 border rounded-full border-white/15 hover:bg-white/5 hover:border-white/30"
          >
            Kontakt aufnehmen
          </a>
        </div>

        {/* Stats row */}
        <div
          className="flex flex-wrap gap-10 pt-12 mt-16 border-t animate-fade-in-up border-white/5"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { number: "10+", label: "Projekte abgeschlossen" },
            { number: "2+", label: "Jahre Erfahrung" },
            { number: "2", label: "Full-Stack Entwickler" },
          ].map(({ number, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{number}</div>
              <div className="mt-1 text-sm text-zinc-500">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;