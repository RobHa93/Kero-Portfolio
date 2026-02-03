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

        <h2 className="headline-2">
        Tools die ich benutze
        </h2>
        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
        Von der Idee bis zum fertigen Code – mit den passenden Tools forme ich digitale Erlebnisse, die Eindruck hinterlassen.  </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {skillItem.map (({imgSrc, label, desc}, key) =>
        (
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