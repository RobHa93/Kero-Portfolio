
const works = [
  {
    imgSrc: "/assets/img/renault.jpg",
    title: "Mietwagen-Tool",
    tags: ["API", "MVC", "Development"],
    projectLink: "https://keha-projekt.onrender.com",
  },
  {
    imgSrc: "/assets/img/netflix.jpg",
    title: "Netflix-Klon",
    tags: ["API", "SPA"],
    projectLink: "#",
  },
  {
    imgSrc: "/assets/img/shop.jpg",
    title: "Ecommerce Shop",
    tags: ["eCommerce","Development", "API"],
    projectLink: "#",
  },
  {
    imgSrc: "/assets/img/tribute-night.png",
    title: "Event Homepage",
    tags: ["Web-design", "Development"],
    projectLink: "https://tribute-night.onrender.com/",
  },
  {
    imgSrc: "/assets/img/tic-tac-toe.jpg",
    title: "Tic Tac Toe",
    tags: ["eCommerce", "Development"],
    projectLink: "#",
  },
  {
    imgSrc: "/assets/img/usluzern.jpg",
    title: "usLuzern Shop",
    tags: ["eCommerce","Web-design", "Development"],
    projectLink: "#",
  },
];

export default function Work() {
  return (
    <div className="min-h-screen bg-zinc-900 py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">
        Ein paar unserer <span className="bg-linear-to-r from-yellow-400 via-lime-400 to-green-500 bg-clip-text text-transparent">Projekte</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {works.map((project, idx) => (
          <div
            key={idx}
            className="bg-zinc-700 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow h-100 justify-between flex flex-col"
          >
            <img
              src={project.imgSrc}
              alt={project.title}
              className="w-full h-48 object-fill"
            />
            <div className="p-4">
              <h3 className="text-xl text-white font-semibold mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-zinc-800 text-white px-2 py-1 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.projectLink ? (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  View Project
                </a>
              ) : (
                <span className="text-gray-500">Coming soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}