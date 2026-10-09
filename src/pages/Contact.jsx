import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SectionLabel from "../components/SectionLabel.jsx";

// Werden von Vite beim Build eingelesen (.env.local bzw. Hosting-Dashboard).
const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;

// text-base (16px) auf Mobile verhindert, dass iOS beim Antippen hineinzoomt.
const inputClass =
  "px-4 py-3 text-base sm:text-sm text-zinc-900 transition-all duration-200 border bg-zinc-50 border-zinc-200 " +
  "placeholder:text-zinc-400 rounded-xl focus:outline-none focus:border-sky-400/50 focus:ring-2 focus:ring-sky-400/20 " +
  "dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-zinc-500";

const STATUS_MESSAGES = {
  success: "Danke! Deine Nachricht ist bei uns angekommen.",
  error: "Das hat leider nicht geklappt. Bitte versuche es später nochmals.",
};

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;

    // Honeypot: Bots füllen versteckte Felder aus
    if (form.elements.website.value) return;

    setStatus("sending");
    try {
      await emailjs.sendForm(VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, form, {
        publicKey: VITE_EMAILJS_PUBLIC_KEY,
      });
      form.reset();
      setStatus("success");
    } catch (error) {
      console.error("EmailJS:", error);
      setStatus("error");
    }
  };

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

          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            {/* Honeypot – für Menschen unsichtbar */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 font-semibold transition-colors duration-200 bg-sky-400 text-zinc-950 rounded-xl hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-wait sm:w-auto sm:self-start"
            >
              {status === "sending" ? "Wird gesendet…" : "Nachricht senden"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`text-sm ${status === "error" ? "text-red-500" : "text-emerald-500"}`}
            >
              {STATUS_MESSAGES[status] ?? ""}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
