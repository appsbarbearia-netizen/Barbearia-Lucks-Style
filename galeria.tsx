import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SectionHead } from "@/components/app/AppShell";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { barbearia, type Foto } from "@/config/barbearia";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de cortes | Luck's Style Barbearia" },
      { name: "description", content: "Degradês, freestyle, luzes e cortes feitos pela equipe da Luck's Style em Vila Matilde (SP)." },
      { property: "og:title", content: "Galeria de cortes | Luck's Style Barbearia" },
      { property: "og:description", content: "Veja trabalhos reais da Barbearia Luck's Style." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Galeria,
});

function Galeria() {
  const [aberta, setAberta] = useState<Foto | null>(null);
  return (
    <section className="px-[18px] py-[22px]">
      <SectionHead title="Nosso portfólio" tag={barbearia.nome} />
      <div className="grid grid-cols-2 gap-[9px]">
        {barbearia.galeria.map((f) => (
          <button key={f.src} type="button" onClick={() => setAberta(f)} className="block cursor-zoom-in">
            <img src={f.src} alt={f.alt} width={360} height={480} loading="lazy" decoding="async" className="photo" />
          </button>
        ))}
      </div>
      <a
        href={`https://www.instagram.com/${barbearia.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline-gold mt-3.5 w-full"
      >
        MAIS NO INSTAGRAM
      </a>

      <Dialog open={aberta !== null} onOpenChange={(o) => !o && setAberta(null)}>
        <DialogContent className="w-[min(94vw,460px)] gap-3 rounded-2xl border-gold bg-popover p-3">
          <DialogTitle className="sr-only">{aberta?.alt}</DialogTitle>
          {aberta ? <img src={aberta.src} alt={aberta.alt} className="w-full rounded-xl" /> : null}
          <p className="text-center text-sm text-soft">{aberta?.alt}</p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
