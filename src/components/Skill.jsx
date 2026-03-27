import SkillCard from "./SkillCard.jsx";

const skillItem = [
  { imgSrc: '/assets/img/figma.svg',      label: 'Figma',       desc: 'Design Tool' },
  { imgSrc: '/assets/img/css3.svg',       label: 'CSS',         desc: 'User Interface' },
  { imgSrc: '/assets/img/javascript.svg', label: 'JavaScript',  desc: 'Interaction' },
  { imgSrc: '/assets/img/nodejs.svg',     label: 'NodeJS',      desc: 'Web Server' },
  { imgSrc: '/assets/img/expressjs.svg',  label: 'ExpressJS',   desc: 'Node Framework' },
  { imgSrc: '/assets/img/mongodb.svg',    label: 'MongoDB',     desc: 'Database' },
  { imgSrc: '/assets/img/react.svg',      label: 'React',       desc: 'Framework' },
  { imgSrc: '/assets/img/tailwindcss.svg',label: 'TailwindCSS', desc: 'User Interface' },
];

const Skill = () => {
  return (
    <section id="skills" className="section bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-sky-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
            Tech Stack
          </span>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-4xl font-bold text-white">
            Tools &amp; Technologien
          </h2>
          <p className="max-w-2xl leading-relaxed text-zinc-400">
            Wir entwickeln mit modernen Frameworks und Tools — von der Idee bis
            zum fertigen Produkt. Unser Fokus: performante, skalierbare und
            benutzerfreundliche Webanwendungen.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard key={key} imgSrc={imgSrc} label={label} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill