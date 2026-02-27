import SkillCard from "./SkillCard";

const skillItem = [
  {
    imgSrc: '/assets/img/figma.svg',
    label: 'Figma',
    desc: 'Design tool'
  },
  {
    imgSrc: '/assets/img/css3.svg',
    label: 'CSS',
    desc: 'User Interface'
  },
  {
    imgSrc: '/assets/img/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction'
  },
  {
    imgSrc: '/assets/img/nodejs.svg',
    label: 'NodeJS',
    desc: 'Web Server'
  },
  {
    imgSrc: '/assets/img/expressjs.svg',
    label: 'ExpressJS',
    desc: 'Node Framework'
  },
  {
    imgSrc: '/assets/img/mongodb.svg',
    label: 'MongoDB',
    desc: 'Database'
  },
  {
    imgSrc: '/assets/img/react.svg',
    label: 'React',
    desc: 'Framework'
  },
  {
    imgSrc: '/assets/img/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'User Interface'
  },
];

const Skill = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-start md:gap-30 mb-12">
           <div className="shrink-0 flex justify-center md:justify-end w-full md:w-auto mb-8 md:mb-0">
            <img
              src="public/assets/img/study-coding.png"
              alt="Coding & Studium"
              width={300}
              height={300}
              className="md:w-75 md:h-80 rounded-xl object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-zinc-400 text-2xl md:text-4xl font-bold mb-4">
              Tools die wir benutzen
            </h2>
            <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]">
              Wir entwickeln moderne Webanwendungen mit Tools wie React, Vue.js, Tailwind CSS und Node.js. Unser Fokus liegt auf performanten, benutzerfreundlichen Lösungen – von Online-Shops bis zu Industrie- und Steuerungs-Apps. Dabei setzen wir auf aktuelle Technologien und effiziente Workflows wie CI/CD mit GitLab. Unsere Projekte reichen von kreativen Plattformen bis zu komplexen Business-Lösungen. So entstehen digitale Erlebnisse, die technisch und im Design überzeugen.
            </p>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {skillItem.map(({ imgSrc, label, desc }, key) => (
            <SkillCard
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              key={key}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill