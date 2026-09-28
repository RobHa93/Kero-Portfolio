import SectionLabel from "./SectionLabel.jsx";

// Version gepinnt, damit sich Icon-Pfade nicht unerwartet ändern.
const CDN = 'https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons';

const skillCategories = [
  {
    category: 'Frontend',
    items: [
      { imgSrc: `${CDN}/vuejs/vuejs-original.svg`,           label: 'Vue.js' },
      { imgSrc: `${CDN}/react/react-original.svg`,           label: 'React' },
      { imgSrc: `${CDN}/tailwindcss/tailwindcss-original.svg`, label: 'Tailwind CSS' },
      { imgSrc: `${CDN}/vuetify/vuetify-original.svg`,       label: 'Vuetify' },
      { imgSrc: `${CDN}/bootstrap/bootstrap-original.svg`,   label: 'Bootstrap' },
    ],
  },
  {
    category: 'Backend',
    items: [
      { imgSrc: `${CDN}/nodejs/nodejs-original.svg`,         label: 'Node.js' },
      { imgSrc: `${CDN}/express/express-original.svg`,       label: 'Express.js', invertOnDark: true },
      { imgSrc: `${CDN}/go/go-original-wordmark.svg`,        label: 'Go' }

    ],
  },
  {
    category: 'Datenbanken',
    items: [
      { imgSrc: `${CDN}/mysql/mysql-original.svg`,           label: 'MySQL' },
      { imgSrc: `${CDN}/mongodb/mongodb-original.svg`,       label: 'MongoDB' },
      { imgSrc: `${CDN}/postgresql/postgresql-original.svg`, label: 'PostgreSQL' },
    ],
  },
  {
    category: 'Sprachen',
    items: [
      { imgSrc: `${CDN}/javascript/javascript-original.svg`, label: 'JavaScript' },
      { imgSrc: `${CDN}/typescript/typescript-original.svg`, label: 'TypeScript' },
      { imgSrc: `${CDN}/python/python-original.svg`,         label: 'Python' },
      { imgSrc: `${CDN}/go/go-original-wordmark.svg`,        label: 'Go' },
      { imgSrc: `${CDN}/html5/html5-original.svg`,           label: 'HTML' },
      { imgSrc: `${CDN}/css3/css3-original.svg`,             label: 'CSS' },
    ],
  },
  {
    category: 'Tools & Workflow',
    items: [
      { imgSrc: `${CDN}/git/git-original.svg`,               label: 'Git' },
      { imgSrc: `${CDN}/gitlab/gitlab-original.svg`,         label: 'GitLab CI/CD' },
      { imgSrc: `${CDN}/vitejs/vitejs-original.svg`,         label: 'Vite' },
      { imgSrc: `${CDN}/webpack/webpack-original.svg`,       label: 'Webpack' },
      { imgSrc: `${CDN}/npm/npm-original-wordmark.svg`,      label: 'npm' },
      { imgSrc: `${CDN}/yarn/yarn-original.svg`,             label: 'Yarn' },
      { imgSrc: `${CDN}/figma/figma-original.svg`,           label: 'Figma' },
      { imgSrc: `${CDN}/postman/postman-original.svg`,       label: 'Postman' },
      { imgSrc: `${CDN}/jenkins/jenkins-original.svg`,       label: 'Jenkins' },
    ],
  },
  {
    category: 'Infrastruktur',
    items: [
      { imgSrc: `${CDN}/docker/docker-original.svg`,         label: 'Docker' }    ],
  },
];

const Skill = () => {
  return (
    <section id="skills" className="section bg-white dark:bg-zinc-950">
      <div className="container">
        <SectionLabel className="mb-10">Tech Stack</SectionLabel>

        <h2 className="mb-3 text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
          Tools &amp; Technologien
        </h2>
        <p className="max-w-xl mb-10 leading-relaxed text-zinc-600 dark:text-zinc-400">
          Moderne Technologien, die sich in der Praxis bewährt haben.
        </p>

        {/* Category rows */}
        <div className="flex flex-col divide-y divide-zinc-200 dark:divide-white/5">
          {skillCategories.map(({ category, items }) => (
            <div
              key={category}
              className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:gap-6"
            >
              {/* Category label */}
              <span className="shrink-0 w-32 text-xs font-semibold tracking-widest uppercase text-zinc-500">
                {category}
              </span>

              {/* Items */}
              <div className="flex flex-wrap gap-2">
                {items.map(({ imgSrc, label, invertOnDark }) => (
                  <div
                    key={label}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-100 border border-zinc-200 hover:border-sky-400/25 hover:bg-zinc-200/50 dark:bg-white/5 dark:border-white/8 dark:hover:bg-white/8 transition-colors duration-200"
                  >
                    <img
                      src={imgSrc}
                      alt=""
                      width={16}
                      height={16}
                      className={`shrink-0 object-contain w-4 h-4 ${invertOnDark ? 'dark:invert' : ''}`}
                      onError={(e) => { e.currentTarget.style.opacity = '0.15'; }}
                    />
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 whitespace-nowrap">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;