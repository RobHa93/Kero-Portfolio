import SectionLabel from "./SectionLabel.jsx";
import { useInView } from "../hooks/useInView.js";

const paragraphs = [
  "Hi, wir sind Kevin und Robin – zwei Brüder, die Webentwicklung nicht nur als Beruf, sondern als gemeinsame Leidenschaft leben. KeRo WebDev ist unser Nebenprojekt: mit vollem Einsatz, aber ohne Agentur-Overhead.",
  "Am liebsten arbeiten wir mit lokalen KMUs, Landwirtschaftsbetrieben und Vereinen zusammen – mit Betrieben, die eine Website wollen, die einfach funktioniert. Zu einem fairen Preis, ohne Fachchinesisch und ohne versteckte Kosten.",
  "Unser Fokus liegt auf der Kombination aus intuitivem Frontend und stabiler, skalierbarer Backend-Architektur. Dabei arbeiten wir sowohl an klassischen Webprojekten wie Plattformen und SPAs als auch an individuellen Software-Lösungen für Betriebe mit speziellen Anforderungen.",
  "Durch unsere Erfahrung in echten Kundenprojekten wissen wir, worauf es ankommt: Performance, Wartbarkeit und ein sauberes Nutzererlebnis.",
];

const About = () => {
  const [imageRef, imageInView] = useInView();

  return (
    <section id="about" className="section bg-white dark:bg-zinc-950">
      <div className="container">
        <SectionLabel>Über uns</SectionLabel>

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-4xl text-zinc-900 dark:text-white">
              Wer steckt hinter<br className="hidden sm:inline" /> KeRo WebDev?
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              <p>
                <strong className="font-semibold text-zinc-900 dark:text-white">Was uns ausmacht?</strong>
                <br />
                Du sprichst direkt mit uns – den Leuten, die deine Website
                tatsächlich bauen. Keine Warteschlaufen, keine Zwischenhändler.
              </p>
            </div>
          </div>

          {/* Bild wird aus echtem Projektcode generiert (useTheme.js + Hero.jsx).
              Ab Desktop ragt es rechts in den freien Seitenrand (wie die Hero-Badges);
              die Zugabe ist pro Breakpoint kleiner als der verfügbare Rand → kein horizontales Scrollen. */}
          <img
            ref={imageRef}
            src="/assets/img/code-to-product.webp"
            alt="Code-Editor mit dem Quellcode dieser Website und daneben ein Smartphone mit der fertigen Startseite"
            width={1400}
            height={919}
            loading="lazy"
            decoding="async"
            className={`w-full h-auto max-w-xl mx-auto lg:mx-0 lg:max-w-none lg:self-center lg:w-[calc(100%+1.5rem)] xl:w-[calc(100%+5rem)] desk:w-[calc(100%+9rem)] 2xl:w-[calc(100%+12rem)] transition-all duration-1000 ease-out ${
              imageInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
