import type { CSSProperties } from "react";

const DEBUG_HOTSPOTS = false;

const hotspots = [
  {
    id: "anywear",
    label: "Anywear",
    description: "Équipement et textile sportif",
    status: "Bientôt",
    href: "#",
    className: "left-[10.5%] top-[19.5%] h-[8.4%] w-[26.8%]",
    color: "132, 255, 88",
  },
  {
    id: "hercule",
    label: "Hercule Project",
    description: "Défis épiques inspirés des 12 travaux",
    status: "En développement",
    href: "#",
    className: "left-[64.4%] top-[20.4%] h-[7.8%] w-[26.2%]",
    color: "255, 122, 39",
  },
  {
    id: "actyv",
    label: "Actyv",
    description: "Défis sportifs collaboratifs",
    status: "Disponible",
    href: "https://actyv-iota.vercel.app",
    className: "left-[7.4%] top-[48%] h-[8.2%] w-[23.5%]",
    color: "52, 231, 231",
  },
  {
    id: "academie",
    label: "A-Cadémie",
    description: "Articles, quiz et progression",
    status: "Disponible",
    href: "https://a-cademie.com",
    className: "left-[70.2%] top-[48.4%] h-[7.1%] w-[24.2%]",
    color: "225, 78, 255",
  },
  {
    id: "quest",
    label: "A-Quest",
    description: "RPG sportif et quêtes d'entraînement",
    status: "En développement",
    href: "#",
    className: "left-[10.4%] top-[78.5%] h-[7.5%] w-[23.2%]",
    color: "68, 174, 255",
  },
  {
    id: "fit",
    label: "A-Fit",
    description: "Programmes, séances et suivi fitness",
    status: "Bientôt",
    href: "#",
    className: "left-[66.7%] top-[74.2%] h-[8.7%] w-[22.6%]",
    color: "255, 91, 207",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[url('/images/sporting-anywhere-bg.png')] bg-contain bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.06)_44%,rgba(0,0,0,0.62)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/55 to-transparent" />

      <nav className="relative z-20 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a
          href="#"
          className="brand-lockup"
          aria-label="Sporting Anywhere"
        >
          <img
            src="/images/logo-sporting-a.png"
            alt=""
            className="brand-logo"
            aria-hidden="true"
          />
          <span className="brand-name">Sporting Anywhere</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-white/78 md:flex">
          <a className="transition hover:text-white" href="#">
            Accueil
          </a>
          <a className="transition hover:text-white" href="#univers">
            Univers
          </a>
          <a className="transition hover:text-white" href="#projets">
            Projets
          </a>
        </div>

        <button
          type="button"
          data-auth-provider="supabase"
          className="rounded-full border border-white/30 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_24px_rgba(135,198,255,0.18)] backdrop-blur-md transition hover:border-white/65 hover:bg-white/16 focus:outline-none focus:ring-2 focus:ring-cyan-200/70 sm:px-5 sm:text-sm"
        >
          Connexion
        </button>
      </nav>

      <section
        id="univers"
        aria-label="Univers Sporting Anywhere"
        className="universe-stage absolute inset-0 z-10"
      >
        <div
          id="projets"
          className="poster-hotspots"
        >
          {hotspots.map((hotspot) => (
            <a
              key={hotspot.id}
              href={hotspot.href}
              aria-label={`${hotspot.label} - ${hotspot.status}`}
              className={`hotspot hotspot--${hotspot.id} absolute rounded-[18px] outline-none ${hotspot.className} ${
                DEBUG_HOTSPOTS ? "hotspot-debug" : ""
              }`}
              style={
                {
                  "--hotspot-color": hotspot.color,
                } as CSSProperties
              }
              target={hotspot.href.startsWith("http") ? "_blank" : undefined}
              rel={
                hotspot.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
            />
          ))}
        </div>

        {hotspots.map((hotspot) => (
          <aside
            key={`${hotspot.id}-panel`}
            className={`launcher-panel launcher-panel--${hotspot.id}`}
            style={
              {
                "--hotspot-color": hotspot.color,
              } as CSSProperties
            }
            aria-hidden="true"
          >
            <span className="launcher-panel__status">{hotspot.status}</span>
            <strong className="launcher-panel__title">{hotspot.label}</strong>
            <span className="launcher-panel__description">
              {hotspot.description}
            </span>
          </aside>
        ))}
      </section>

      <p
        className="brand-tagline"
        aria-label="Un seul compte. Plusieurs univers sportifs."
      >
        <span aria-hidden="true">✦</span>
        <span>UN SEUL COMPTE. PLUSIEURS UNIVERS SPORTIFS.</span>
        <span aria-hidden="true">✦</span>
      </p>
    </main>
  );
}
