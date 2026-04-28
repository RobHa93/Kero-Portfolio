const About = () => {
  return (
    <section id="about" className="section bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-sky-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
            Über uns
          </span>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-1">
          {/* Left — text & stats */}
          <div>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
              Wer steckt hinter<br />KeRo WebDev?
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-zinc-400">
              Hi, wir sind Robin und Kevin, die Köpfe hinter KeRo WebDev.
              Als Full-Stack Webentwickler entwickeln wir moderne Weblösungen von Grund auf: von der ersten Idee bis zum produktiven Einsatz.
              <br />
              <br />
              Unser Fokus liegt auf der Kombination aus intuitivem Frontend und stabiler, skalierbarer Backend-Architektur. Dabei arbeiten wir sowohl an klassischen Webprojekten wie Plattformen und Online-Shops als auch an individuellen Industrie- und Softwarelösungen.
              <br />
              <br />              
              Durch unsere Erfahrung in realen Kundenprojekten, darunter auch sehr komplexe Anwendungen, wissen wir, worauf es ankommt:
              Performance, Wartbarkeit und ein sauberes Nutzererlebnis.
              <br />
              <br />
              Was uns ausmacht? <br />
              Wir denken nicht nur in Features, sondern in Lösungen.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { number: "10+", label: "Projekte abgeschlossen" },
                { number: "3+", label: "Jahre Erfahrung" },
              ].map(({ number, label }) => (
                <div key={label} className="pl-4 border-l-2 border-sky-400">
                  <div className="text-3xl font-bold text-white">{number}</div>
                  <div className="mt-1 text-sm text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;