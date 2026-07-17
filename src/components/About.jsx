const About = () => {
  return (
    <section id="about" className="section bg-white dark:bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-sky-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
            Über uns
          </span>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-1">
          {/* Left - text & stats */}
          <div>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-zinc-900 dark:text-white">
              Wer steckt hinter<br />KeRo WebDev?
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Hi, wir sind Kevin und Robin - zwei Brüder, die Webentwicklung
              nicht nur als Beruf, sondern als gemeinsame Leidenschaft leben.
              KeRo WebDev ist unser Nebenprojekt: mit vollem Einsatz, aber
              ohne Agentur-Overhead.
              <br />
              <br />
              Am liebsten arbeiten wir mit lokalen KMUs, Landwirtschaftsbetrieben
              und Vereinen zusammen - mit Betrieben, die eine Website wollen,
              die einfach funktioniert. Zu einem fairen Preis, ohne
              Fachchinesisch und ohne versteckte Kosten.
              <br />
              <br />
              Unser Fokus liegt auf der Kombination aus intuitivem Frontend und stabiler, skalierbarer Backend-Architektur. Dabei arbeiten wir sowohl an klassischen Webprojekten wie Plattformen und SPAs als auch an individuellen Software-Lösungen für Betriebe mit speziellen Anforderungen.
              <br />
              <br />
              Durch unsere Erfahrung in echten Kundenprojekten wissen wir, worauf es ankommt:
              Performance, Wartbarkeit und ein sauberes Nutzererlebnis.
              <br />
              <br />
              Was uns ausmacht? <br />
              Du sprichst direkt mit uns - den Leuten, die deine Website
              tatsächlich bauen. Keine Warteschlaufen, keine Zwischenhändler.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { number: "4+", label: "Projekte abgeschlossen" },
                { number: "3+", label: "Jahre Erfahrung" },
              ].map(({ number, label }) => (
                <div key={label} className="pl-4 border-l-2 border-sky-400">
                  <div className="text-3xl font-bold text-zinc-900 dark:text-white">{number}</div>
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