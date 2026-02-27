const socialLinks = [
{ href: "#", alt: "GitHub", icon: <i className="fab fa-github"></i> },
{ href: "#", alt: "LinkedIn", icon: <i className="fab fa-linkedin"></i> },
{ href: "#", alt: "Twitter", icon: <i className="fab fa-twitter"></i> },
{ href: "#", alt: "Instagram", icon: <i className="fab fa-instagram"></i> },
];

const Contact = () => {
  return (
     <div className="container mx-auto lg:grid lg:grid-cols-2 lg:gap-10 py-16">
      {/* Linke Spalte: Social Links */}
      <div className="bg-zinc-900 text-white p-8 flex flex-col items-center justify-start">
        <h2 className="text-3xl font-bold mb-6">
          Kontaktieren Sie <span className="bg-linear-to-r from-yellow-400 via-lime-400 to-green-500 bg-clip-text text-transparent">UNS</span> gerne
        </h2>
        <p className="text-gray-200 mb-8">
          Sie finden uns hier:
        </p>

        <div className="flex justify-center gap-6 text-3xl">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-sky-400 transition-colors"
              aria-label={link.alt}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Rechte Spalte: Kontaktformular */}
      <div className="bg-zinc-900 text-white p-8 flex items-center justify-center">
        <form
          action="https://formspree.io/f/mayvldwp"
          method="POST"
          className="flex flex-col gap-4 w-full max-w-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Ihr Name"
            className="p-2 border border-gray-300 rounded bg-zinc-700"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Ihre E-Mail"
            className="p-2 border border-gray-300 rounded bg-zinc-700"
            required
          />
          <textarea
            name="message"
            placeholder="Ihre Nachricht"
            className="p-2 border border-gray-300 rounded bg-zinc-700 h-36"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-sky-400 text-black py-2 rounded"
          >
            Absenden
          </button>
        </form>
      </div>
    </div>
  );
};
export default Contact;