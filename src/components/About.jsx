
const aboutItems = [
  {
    label: 'Project done',
    number: 10
  },
  {
    label: 'Years of experience',
    number: 2
  }
];



const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="bg-zinc-800/50 p-7 mt-10 rounded-2xl md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            {/* Linke Seite: Text und Zahlen */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl mb-4 md:mb-8 md:max-w-[60ch]">
                <span className="bg-linear-to-r from-yellow-400 via-lime-400 to-green-500 bg-clip-text text-transparent">Wer sind wir?</span>
              </h1>
              <p className="text-zinc-300 mb-4 md:mb-8 md:text-xl md:max-w-[60ch]">
                Hi, wir sind Robin und Kevin!
                Als Full-Stack Webentwickler verbinden wir modernes Frontend-Design mit stabiler Backend-Architektur und setzen Projekte von Online-Shops bis zu Industrie-Anwendungen um. Unser Tech-Stack umfasst u.a. Vue.js, React, Tailwind CSS, Node.js, Express.js, MySQL und MongoDB. Viele Projekte entstehen im Rahmen von NDA-geschützten Aufträgen, aber hier zeigen wir euch eine Auswahl typischer Arbeiten und Herzensprojekte. Wir lieben es, gemeinsam innovative Ideen zum Leben zu erwecken und digitale Visionen Wirklichkeit werden zu lassen.
              </p>
              <div className="flex gap-8 mb-4">
                {aboutItems.map(({ label, number }, key) => (
                  <div key={key} className="flex flex-col items-start">
                    <div className="flex items-center md:mb-2">
                      <span className="text-2xl font-bold md:text-4xl">
                        {number}
                      </span>
                      <span className="text-sky-400 font-semibold md:text-3xl">+</span>
                    </div>
                    <p className="text-sm text-zinc-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Rechte Seite: Bild */}
            <div className="shrink-0 flex justify-center w-full md:w-auto">
              <div className="flex gap-4">
                <img
                  src="public/assets/img/learn-by-doing.png"
                  alt="Logo"
                  width={300}
                  height={300}
                  className="md:w-75 md:h-80 rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About