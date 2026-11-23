import { Link } from "@tanstack/react-router";
import { CalendarDays, Download, Home, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";

import { barbearia } from "@/config/barbearia";

import { useInstall } from "./install";

export function InstallButton() {
  const { canShow, install } = useInstall();
  if (!canShow) return null;
  return (
    <button
      type="button"
      onClick={install}
      className="inline-flex flex-none items-center gap-1.5 rounded-full border border-gold px-3 py-2 text-xs font-bold text-gold-light"
    >
      <Download className="size-4" aria-hidden />
      Baixar app
    </button>
  );
}

const navItem =
  "flex flex-col items-center gap-1 px-0.5 py-1 text-[11px] text-nav-idle no-underline aria-[current=page]:text-gold-light [&_svg]:size-[22px] [&_svg]:stroke-[1.7]";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className="app-frame">
      <header className="app-header">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 no-underline">
          <img
            src={barbearia.logo}
            width={44}
            height={44}
            alt={`Logo ${barbearia.nome}`}
            className="size-11 flex-none rounded-full border border-gold object-cover"
          />
          <div className="min-w-0">
            <strong className="block truncate font-display text-[19px] tracking-[1.5px] text-gold-light">
              {barbearia.nome.toUpperCase()}
            </strong>
            <small className="block text-[10px] uppercase tracking-[2px] text-muted-foreground">
              {barbearia.sloganPequeno}
            </small>
          </div>
        </Link>
        <InstallButton />
      </header>

      {children}

      <nav className="bottom-nav" aria-label="Navegação principal">
        <Link to="/" activeOptions={{ exact: true }} className={navItem}>
          <Home aria-hidden />
          Início
        </Link>
        <Link to="/agendar" className={navItem}>
          <CalendarDays aria-hidden />
          Agendar
        </Link>
        <Link to="/galeria" className={navItem}>
          <LayoutGrid aria-hidden />
          Galeria
        </Link>
      </nav>
    </main>
  );
}

export function SectionHead({ title, tag }: { title: string; tag?: ReactNode }) {
  return (
    <div className="mb-3.5 flex items-end justify-between gap-2.5">
      <h2 className="m-0 font-display text-[23px] font-bold">{title}</h2>
      {tag ? (
        <span className="whitespace-nowrap text-[11px] uppercase tracking-[1.4px] text-gold">{tag}</span>
      ) : null}
    </div>
  );
}
