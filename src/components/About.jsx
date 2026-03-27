const About = () => {
  return (
    <section id="about" className="section bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
            Über uns
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — text & stats */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Wer steckt hinter<br />KeRo WebDev?
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-4">
              Hi, wir sind Robin und Kevin! Als Full-Stack Webentwickler
              verbinden wir modernes Frontend-Design mit stabiler
              Backend-Architektur und setzen Projekte von Online-Shops bis zu
              Industrie-Anwendungen um.
            </p>
            <p className="text-zinc-500 leading-relaxed mb-10">
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
                <div key={label} className="border-l-2 border-emerald-400 pl-4">
                  <div className="text-3xl font-bold text-white">{number}</div>
                  <div className="text-sm text-zinc-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — tech tags + availability card */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">
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
                    className="text-sm text-zinc-300 bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-400/5 border border-emerald-400/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-sm font-medium">
                  Available for work
                </span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">
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