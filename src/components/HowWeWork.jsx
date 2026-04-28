const principles = [
  'Klare Kommunikation & direkte Zusammenarbeit',
  'Schnelle Iterationen statt endloser Konzepte',
  'Sauberer, wartbarer Code',
  'Fokus auf Performance und Skalierbarkeit',
];

const services = [
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" /></svg>,
    title: 'Webentwicklung',
    desc: 'Webanwendungen, Plattformen & Tools',
  },
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" /></svg>,
    title: 'UI / UX Design',
    desc: 'Moderne, intuitive Interfaces',
  },
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.67-3.014c.31-.023.618-.05.928-.075M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
    title: 'Individuelle Software',
    desc: 'Industrie, interne Tools & Automatisierung',
  },
  {
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>,
    title: 'Optimierung & Migration',
    desc: 'Modernisierung & Performance-Upgrades',
  },
];

const HowWeWork = () => {
  return (
    <section id="how-we-work" className="section">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-sky-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
            Wie wir arbeiten
          </span>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Left — heading & principles */}
          <div>
            <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
              Wie wir arbeiten
            </h2>
            <p className="mb-8 leading-relaxed text-zinc-400">
              Wir begleiten Projekte ganzheitlich, von der Idee bis zur
              Umsetzung und darüber hinaus.
            </p>
            <ul className="flex flex-col gap-3">
              {principles.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-sky-400/15 flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <p className="pl-4 mt-8 text-sm leading-relaxed border-l-2 text-zinc-500 border-sky-400">
              Unser Ziel: Produkte entwickeln, die langfristig funktionieren —
              nicht nur beim Launch.
            </p>
          </div>

          {/* Right — compact services */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Unsere Leistungen</h3>
            <div className="flex flex-col gap-2">
              {services.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 px-4 py-3 transition-all duration-200 border rounded-lg border-white/8 bg-white/3 hover:border-sky-400/25 hover:bg-white/6"
                >
                  <span className="flex items-center justify-center flex-shrink-0 rounded-md w-7 h-7 bg-sky-400/10 text-sky-400">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <span className="block text-sm font-medium text-white">{title}</span>
                    <span className="block text-xs truncate text-zinc-500">{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
