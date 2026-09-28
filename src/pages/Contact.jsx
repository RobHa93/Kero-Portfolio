import SectionLabel from "../components/SectionLabel.jsx";

// text-base (16px) auf Mobile verhindert, dass iOS beim Antippen hineinzoomt.
const inputClass =
  "px-4 py-3 text-base sm:text-sm text-zinc-900 transition-all duration-200 border bg-zinc-50 border-zinc-200 " +
  "placeholder:text-zinc-400 rounded-xl focus:outline-none focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 " +
  "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-500";

// TODO: Auf EmailJS umstellen – Anleitung in WORKBOOK.md, Kapitel 4.
const FORM_ENDPOINT = "https://formspree.io/f/mayvldwp";

const Contact = () => {
  return (
    <section id="contact" className="section bg-white dark:bg-zinc-950">
      <div className="container">
        <SectionLabel>Kontakt</SectionLabel>

        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl text-zinc-900 dark:text-white">
              Starten wir gemeinsam<br className="hidden sm:inline" /> dein nächstes Projekt.
            </h2>
            <p className="mb-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Du hast ein Projekt, eine Idee oder möchtest einfach in Kontakt
              treten? Schreib uns — wir freuen uns auf deine Nachricht.
            </p>
          </div>

          <form action={FORM_ENDPOINT} method="POST" className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label htmlFor="contact-name" className="sr-only">Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Dein Name"
                required
                className={inputClass}
              />
              <label htmlFor="contact-email" className="sr-only">E-Mail</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Deine E-Mail"
                required
                className={inputClass}
              />
            </div>
            <label htmlFor="contact-message" className="sr-only">Nachricht</label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Deine Nachricht..."
              required
              rows={6}
              className={`${inputClass} resize-none`}
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
