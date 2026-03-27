const works = [
  {
    imgSrc: "/assets/img/lfg_homepage.png",
    title: "Langenfeld Garage",
    description:
      "Homepage für ein lokales Autohaus — modernes Design, klare Struktur und SEO-Optimierung.",
    tags: ["Website", "Web Design", "Development"],
    projectLink: "https://projekt-lfg.onrender.com",
  },
  {
    imgSrc: "/assets/img/galloway_homepage.png",
    title: "Henrys Farm Homepage",
    description:
      "Single-Page-Application für einen landwirtschaftlichen Betrieb mit attraktiver Bildwelt.",
    tags: ["SPA", "Web Design", "Development"],
    projectLink: "https://projekt-galloway.onrender.com",
  },
  {
    imgSrc: "/assets/img/shop.jpg",
    title: "Ecommerce Shop",
    description:
      "Vollständiger Online-Shop mit Produktverwaltung, Warenkorb und Checkout-Flow.",
    tags: ["eCommerce", "API", "Fullstack"],
    projectLink: null,
  },
  {
    imgSrc: "/assets/img/tribute-night.png",
    title: "Tribute Night Event",
    description:
      "Event-Homepage für eine Live-Musik-Veranstaltungsreihe mit Ticket-Integration.",
    tags: ["Web Design", "Development"],
    projectLink: "https://tribute-night.onrender.com/",
  },
  {
    imgSrc: "/assets/img/netflix.jpg",
    title: "Netflix-Klon",
    description:
      "Vollständiger Netflix-Clone mit TMDB API-Integration und Nutzerauthentifizierung.",
    tags: ["API", "SPA", "Fullstack"],
    projectLink: null,
  },
  {
    imgSrc: "/assets/img/autofire_homepage.png",
    title: "Autofire Homepage",
    description:
      "Moderne SPA für einen Automotive-Dienstleister mit animiertem Hero und Servicepages.",
    tags: ["SPA", "Web Design", "Development"],
    projectLink: "https://projekt-auto.onrender.com",
  },
];

const tagStyles = {
  Website:     "bg-sky-400/10 text-sky-400 border-sky-400/20",
  SPA:         "bg-purple-400/10 text-purple-400 border-purple-400/20",
  "Web Design":"bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  Development: "bg-zinc-600/30 text-zinc-400 border-zinc-600/40",
  eCommerce:   "bg-orange-400/10 text-orange-400 border-orange-400/20",
  API:         "bg-blue-400/10 text-blue-400 border-blue-400/20",
  Fullstack:   "bg-red-400/10 text-red-400 border-red-400/20",
};

const tagClass = (tag) =>
  tagStyles[tag] || "bg-zinc-700/50 text-zinc-400 border-zinc-700";

export default function Work() {
  return (
    <section id="work" className="section bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
            Projekte
          </span>
        </div>

        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ausgewählte Projekte
          </h2>
          <p className="text-zinc-400 max-w-xl leading-relaxed">
            Ein Einblick in unsere Arbeit — von kreativen Websites bis zu
            komplexen Full-Stack-Anwendungen.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((project, idx) => (
            <div
              key={idx}
              className="group flex flex-col bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-emerald-400/25 hover:bg-white/5 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48 shrink-0">
                <img
                  src={project.imgSrc}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-white font-semibold text-lg mb-2">
                  {project.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full border ${tagClass(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                {project.projectLink ? (
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors group/link"
                  >
                    Live ansehen
                    <svg
                      className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ) : (
                  <span className="text-sm text-zinc-600">Coming soon</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}