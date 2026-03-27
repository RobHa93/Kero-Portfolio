const Contact = () => {
  return (
    <section id="contact" className="section bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-px w-8 bg-emerald-400" />
          <span className="text-emerald-400 text-sm font-medium tracking-widest uppercase">
            Kontakt
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left — heading & socials */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Starten Sie Ihr<br />nächstes Projekt.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Sie haben ein Projekt, eine Idee oder möchten einfach in Kontakt
              treten? Schreiben Sie uns — wir freuen uns auf Ihre Nachricht.
            </p>

            {/* Social pill links */}
            <div className="flex flex-wrap gap-3">
              {[
                { label: "GitHub",    href: "#" },
                { label: "LinkedIn",  href: "#" },
                { label: "Instagram", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-emerald-400 border border-white/10 hover:border-emerald-400/30 px-4 py-2 rounded-full transition-all duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            action="https://formspree.io/f/mayvldwp"
            method="POST"
            className="flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Ihr Name"
                required
                className="bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400/50 transition-all duration-200"
              />
              <input
                type="email"
                name="email"
                placeholder="Ihre E-Mail"
                required
                className="bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400/50 transition-all duration-200"
              />
            </div>
            <textarea
              name="message"
              placeholder="Ihre Nachricht..."
              required
              rows={6}
              className="bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400/50 transition-all duration-200 resize-none"
            />
            <button
              type="submit"
              className="bg-emerald-400 text-zinc-950 font-semibold py-3 px-6 rounded-xl hover:bg-emerald-300 transition-colors duration-200 w-full sm:w-auto sm:self-start"
            >
              Nachricht senden
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;