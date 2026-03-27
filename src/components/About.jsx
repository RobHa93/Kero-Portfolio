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

        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Left — text & stats */}
          <div>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white">
              Wer steckt hinter<br />KeRo WebDev?
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-zinc-400">
              Hi, wir sind Robin und Kevin! Als Full-Stack Webentwickler
              verbinden wir modernes Frontend-Design mit stabiler
              Backend-Architektur und setzen Projekte von Online-Shops bis zu
              Industrie-Anwendungen um.
            </p>
            <p className="mb-10 leading-relaxed text-zinc-500">
              Unser Tech-Stack umfasst u.a. Vue.js, React, Tailwind CSS,
              Node.js, Express.js, MySQL und MongoDB. Viele Projekte entstehen
              im Rahmen von NDA-geschützten Aufträgen — hier zeigen wir eine
              Auswahl typischer Arbeiten und Herzensprojekte.
            </p>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { number: "10+", label: "Projekte abgeschlossen" },
                { number: "2+", label: "Jahre Erfahrung" },
              ].map(({ number, label }) => (
                <div key={label} className="pl-4 border-l-2 border-sky-400">
                  <div className="text-3xl font-bold text-white">{number}</div>
                  <div className="mt-1 text-sm text-zinc-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — tech tags + availability card */}
          <div className="flex flex-col gap-4">
            <div className="p-6 border bg-white/5 border-white/10 rounded-2xl">
              <h3 className="mb-4 font-semibold text-white">
                Full-Stack Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Vue.js",
                  "Node.js",
                  "Express.js",
                  "Tailwind CSS",
                  "MySQL",
                  "MongoDB",
                  "CI/CD",
                  "GitLab",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm border rounded-full text-zinc-300 bg-zinc-800 border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 border bg-sky-400/5 border-sky-400/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-sky-400" />
                </span>
                <span className="text-sm font-medium text-sky-400">
                  Available for work
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-400">
                Wir sind offen für neue Freelance-Projekte und
                Kooperationen. Sprechen Sie uns gerne an!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;