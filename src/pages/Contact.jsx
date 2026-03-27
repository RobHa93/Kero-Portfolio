const Contact = () => {
  return (
    <section id="contact" className="section bg-zinc-950">
      <div className="container">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-8 h-px bg-sky-400" />
          <span className="text-sm font-medium tracking-widest uppercase text-sky-400">
            Kontakt
          </span>
        </div>

        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Left — heading & socials */}
          <div>
            <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
              Starten WIR gemeinsam <br /> ihr nächstes Projekt.
            </h2>
            <p className="mb-8 leading-relaxed text-zinc-400">
              Sie haben ein Projekt, eine Idee oder möchten einfach in Kontakt
              treten? Schreiben Sie uns — wir freuen uns auf Ihre Nachricht.
            </p>
          </div>

          {/* Right — form */}
          <form
            action="https://formspree.io/f/mayvldwp"
            method="POST"
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Ihr Name"
                required
                className="px-4 py-3 text-sm text-white transition-all duration-200 border bg-white/5 border-white/10 placeholder:text-zinc-600 rounded-xl focus:outline-none focus:border-sky-400/50"
              />
              <input
                type="email"
                name="email"
                placeholder="Ihre E-Mail"
                required
                className="px-4 py-3 text-sm text-white transition-all duration-200 border bg-white/5 border-white/10 placeholder:text-zinc-600 rounded-xl focus:outline-none focus:border-sky-400/50"
              />
            </div>
            <textarea
              name="message"
              placeholder="Ihre Nachricht..."
              required
              rows={6}
              className="px-4 py-3 text-sm text-white transition-all duration-200 border resize-none bg-white/5 border-white/10 placeholder:text-zinc-600 rounded-xl focus:outline-none focus:border-sky-400/50"
            />
            <button
              type="submit"
              className="w-full px-6 py-3 font-semibold transition-colors duration-200 bg-sky-400 text-zinc-950 rounded-xl hover:bg-emerald-300 sm:w-auto sm:self-start"
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