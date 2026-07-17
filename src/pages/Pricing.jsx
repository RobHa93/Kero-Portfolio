import { useState } from "react";

const tiers = [
  {
    id: "hosting",
    name: "Hosting",
    description: "Deine Website läuft - zuverlässig, sicher und immer erreichbar.",
    setupOnepager: "ab CHF 299.-",
    setupMultipager: "ab CHF 999.-",
    price: { monthly: "CHF 49.-", annually: "CHF 588.-" },
    featured: false,
    highlights: [
      "Hosting & Betrieb",
      "SSL-Zertifikat",
      "Automatische Backups",
      "Wir behalten deine Seite im Blick",
      "Mobile optimiert",
    ],
    note: null,
  },
  {
    id: "business",
    name: "Business",
    description: "Laufende Betreuung für deinen professionellen Webauftritt.",
    setupOnepager: "ab CHF 299.-",
    setupMultipager: "ab CHF 999.-",
    price: { monthly: "CHF 75.-", annually: "CHF 900.-" },
    featured: true,
    highlights: [
      "Alles aus Hosting",
      "SEO-Basics",
      "Performance-Optimierung",
      "Kontaktformular & Bildergalerie",
      "2 kleine Änderungen pro Monat",
      "Updates & Sicherheits-Patches",
    ],
    note: "Grössere Änderungen werden nach Aufwand separat offeriert.",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Ideal für grössere Multi-Pager- und SPA-Projekte mit mehr Betreuungsbedarf.",
    setupOnepager: "ab CHF 299.-",
    setupMultipager: "ab CHF 999.-",
    price: { monthly: "CHF 149.-", annually: "CHF 1'788.-" },
    featured: false,
    highlights: [
      "Alles aus Business",
      "Bis zu 5 kleine Änderungen pro Monat",
      "Schnellerer Support",
      "Laufende Überwachung deiner Seite",
      "Regelmässige Status-Updates von uns",
    ],
    note: "Grössere Änderungen werden nach Aufwand separat offeriert.",
  },
];

const CheckIcon = () => (
  <svg
    className="flex-none w-4 h-4 text-sky-400"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
      clipRule="evenodd"
    />
  </svg>
);

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  return (
    <section id="pricing" className="section bg-gray-50 dark:bg-zinc-950">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="mb-3 text-sm font-semibold tracking-widest uppercase text-sky-400">
            Preise
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Transparent &amp; fair
          </h2>
          <p className="max-w-xl mx-auto text-zinc-600 dark:text-zinc-400">
            Einmaliges Setup, monatliche Betreuung. Keine versteckten Kosten.
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
            Monatlich kündbar — keine Mindestlaufzeit.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 mt-8 text-sm font-semibold rounded-full bg-zinc-200 dark:bg-white/5">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                billing === "monthly"
                  ? "bg-sky-400 text-zinc-950"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Monatlich
            </button>
            <button
              onClick={() => setBilling("annually")}
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                billing === "annually"
                  ? "bg-sky-400 text-zinc-950"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              Jährlich
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid items-stretch grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-200 ${
                tier.featured
                  ? "bg-white border-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.08)] dark:bg-zinc-900"
                  : "bg-white border-zinc-200 dark:bg-zinc-900/50 dark:border-white/8"
              }`}
            >
              {tier.featured && (
                <span className="absolute px-3 py-1 text-xs font-bold tracking-wide -translate-x-1/2 rounded-full -top-3 left-1/2 bg-sky-400 text-zinc-950">
                  Beliebt
                </span>
              )}

              {/* Name & description */}
              <div className="mb-6">
                <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-white">{tier.name}</h3>
                <p className="text-sm text-zinc-500">{tier.description}</p>
              </div>

              {/* Setup fee */}
              <div className="mb-3">
                <p className="mb-0.5 text-xs text-zinc-500">
                  Setup Singlepage:{" "}
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{tier.setupOnepager}</span>
                </p>
                <p className="text-xs text-zinc-500">
                  Setup Multipager{" "}
                  <span className="text-zinc-600">(bis 5 Seiten)</span>:{" "}
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">{tier.setupMultipager}</span>
                </p>
              </div>

              {/* Monthly price */}
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                  {tier.price[billing]}
                </span>
              </div>
              <p className="mb-8 text-xs text-zinc-500">
                {billing === "annually" ? "pro Jahr, jährlich abgerechnet" : "pro Monat, monatlich abgerechnet"}
              </p>

              {/* Divider */}
              <div className="mb-6 border-t border-zinc-200 dark:border-white/8" />

              {/* Features */}
              <ul className="flex-1 space-y-3">
                {tier.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Note */}
              {tier.note && (
                <p className="pt-4 mt-5 text-xs leading-relaxed border-t border-zinc-200 dark:border-white/8 text-zinc-500 dark:text-zinc-600">
                  {tier.note}
                </p>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-center text-zinc-600">
          Alle Preise in CHF. · Individuelle Anfragen?{" "}
          <a href="#contact" className="text-sky-400 hover:underline">
            Schreib uns
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Pricing;
