import { useState } from "react";

const tiers = [
  {
    id: "start",
    name: "Kero-Web Start",
    description: "Perfekt für einen professionellen ersten Auftritt im Web.",
    setup: "CHF 1'200",
    price: { monthly: "CHF 49", annually: "CHF 470" },
    billingNote: { monthly: "pro Monat", annually: "pro Jahr (2 Monate gratis)" },
    featured: false,
    highlights: [
      "Onepager",
      "Mobile optimiert",
      "Kontaktformular",
      "Google Maps",
      "Hosting",
      "SSL",
      "Backup",
      "1 kleine Änderung pro Monat",
    ],
  },
  {
    id: "business",
    name: "Kero-Web Business",
    description: "Für wachsende Unternehmen mit mehr Inhalt und Reichweite.",
    setup: "CHF 2'500",
    price: { monthly: "CHF 99", annually: "CHF 950" },
    billingNote: { monthly: "pro Monat", annually: "pro Jahr (2 Monate gratis)" },
    featured: true,
    highlights: [
      "5 Seiten",
      "SEO-Basics",
      "Bildergalerie",
      "Kontaktformular",
      "Performance-Optimierung",
      "Hosting",
      "Updates",
      "2 kleine Änderungen pro Monat",
    ],
  },
  {
    id: "pro",
    name: "Kero-Web Pro",
    description: "Massgeschneiderte Lösungen für komplexe Anforderungen.",
    setup: "ab CHF 4'000",
    price: { monthly: "CHF 199", annually: "CHF 1'910" },
    billingNote: { monthly: "pro Monat", annually: "pro Jahr (2 Monate gratis)" },
    featured: false,
    highlights: [
      "Individuelle Website",
      "Admin-Bereich optional",
      "Regelmässige Änderungen",
      "Monitoring",
      "Priorisierter Support",
    ],
  },
];

const CheckIcon = () => (
  <svg
    className="w-4 h-4 flex-none text-sky-400"
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
    <section id="pricing" className="section bg-zinc-950">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-sky-400 mb-3">
            Preise
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Transparent &amp; fair
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Einmaliges Setup, monatliche Betreuung. Keine versteckten Kosten.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-white/5 p-1 text-sm font-semibold">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                billing === "monthly"
                  ? "bg-sky-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monatlich
            </button>
            <button
              onClick={() => setBilling("annually")}
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                billing === "annually"
                  ? "bg-sky-400 text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Jährlich
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-200 ${
                tier.featured
                  ? "bg-zinc-900 border-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.08)]"
                  : "bg-zinc-900/50 border-white/8"
              }`}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-400 text-zinc-950 text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                  Beliebt
                </span>
              )}

              {/* Name & description */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-zinc-500">{tier.description}</p>
              </div>

              {/* Setup fee */}
              <p className="text-xs text-zinc-500 mb-1">
                Setup: <span className="text-zinc-300 font-medium">{tier.setup}</span>
              </p>

              {/* Monthly price */}
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold text-white">
                  {tier.price[billing]}
                </span>
              </div>
              <p className="text-xs text-zinc-500 mb-8">{tier.billingNote[billing]}</p>

              {/* Divider */}
              <div className="border-t border-white/8 mb-6" />

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {tier.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-600 text-sm mt-10">
          Alle Preise in CHF, exkl. MwSt. · Individuelle Anfragen?{" "}
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
