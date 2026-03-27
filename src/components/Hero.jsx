
import { useState, useEffect } from "react";

const endings = [
  "die begeistern.",
  "die überzeugen.",
  "die bleiben.",
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
      className="relative min-h-screen flex items-center bg-zinc-950 overflow-hidden"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-sky-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 pt-24 pb-16">
        {/* Availability badge */}
        <div className="animate-fade-in-up flex items-center gap-2 mb-8 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-sm text-zinc-400 tracking-wide">
            Available for freelance projects
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
            className="text-emerald-400 transition-opacity duration-400"
            style={{ opacity: visible ? 1 : 0 }}
          >
            {endings[index]}
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="animate-fade-in-up text-lg text-zinc-400 max-w-xl mb-10 leading-relaxed"
          style={{ animationDelay: "0.2s" }}
        >
          Wir sind Robin &amp; Kevin — Full-Stack Webentwickler aus der Schweiz.
          Wir bauen smarte, skalierbare Webanwendungen, die echten Mehrwert
          bieten.
        </p>

        {/* CTA buttons */}
        <div
          className="animate-fade-in-up flex flex-wrap gap-4"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#work"
            className="bg-emerald-400 text-zinc-950 font-semibold px-6 py-3 rounded-full hover:bg-emerald-300 hover:scale-105 transition-all duration-200"
          >
            Projekte ansehen
          </a>
          <a
            href="#contact"
            className="border border-white/15 text-white font-medium px-6 py-3 rounded-full hover:bg-white/5 hover:border-white/30 transition-all duration-200"
          >
            Kontakt aufnehmen
          </a>
        </div>

        {/* Stats row */}
        <div
          className="animate-fade-in-up flex flex-wrap gap-10 mt-16 pt-12 border-t border-white/5"
          style={{ animationDelay: "0.4s" }}
        >
          {[
            { number: "10+", label: "Projekte abgeschlossen" },
            { number: "2+", label: "Jahre Erfahrung" },
            { number: "2", label: "Full-Stack Entwickler" },
          ].map(({ number, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-white">{number}</div>
              <div className="text-sm text-zinc-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;