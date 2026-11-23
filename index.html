import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, MessageCircle, Star } from "lucide-react";

import { SectionHead } from "@/components/app/AppShell";
import { useInstall } from "@/components/app/install";
import { barbearia } from "@/config/barbearia";
import { formatBRL, whatsappLink } from "@/lib/agenda";

const title = "Luck's Style | Barbearia em Vila Matilde desde 2017";
const description =
  "Corte, barba, luzes e tratamentos na Barbearia Luck's Style, em Vila Matilde (SP). Veja preços, trabalhos e agende pelo WhatsApp.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarberShop",
  name: barbearia.nomeCompleto,
  telephone: "+55 11 97094-1300",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Waldemar Carlos Pereira, 1886",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "03533-003",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "20:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
  ],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: barbearia.totalAvaliacoes },
  sameAs: [`https://www.instagram.com/${barbearia.instagram}`],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: barbearia.descricaoCurta },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Vitrine />
      <Servicos />
      <Equipe />
      <Avaliacoes />
      <InstallCard />
      <Contato />
    </>
  );
}

function Hero() {
  return (
    <section className="px-[18px] pb-2.5 pt-3">
      <div className="hero-card">
        <img
          src={barbearia.capa}
          alt="Invista no seu visual — Barbearia Luck's Style"
          width={1600}
          height={750}
          className="relative block aspect-[1600/750] w-full object-cover"
        />
        <div className="relative z-[1] px-[19px] pb-[22px] pt-4">
          <div className="text-[11px] uppercase tracking-[3px] text-gold">Desde 2017 · Vila Matilde</div>
          <h1 className="my-2 font-display text-[29px] font-bold leading-[1.06]">Cuidando do seu estilo.</h1>
          <p className="mb-3.5 text-[13px] leading-normal text-soft">
            Técnica, atenção aos detalhes e atendimento personalizado. Mais do que um corte: a confiança de estar
            sempre bem apresentado.
          </p>
          <Link to="/agendar" className="btn-gold">
            AGENDAR MEU HORÁRIO&nbsp; →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Vitrine() {
  return (
    <section className="px-[18px] py-[22px]">
      <SectionHead title={`Vitrine ${barbearia.nome}`} tag="Trabalhos reais" />
      <div className="grid grid-cols-2 gap-[9px]">
        {barbearia.vitrine.map((f) => (
          <img key={f.src} src={f.src} alt={f.alt} width={360} height={480} loading="lazy" decoding="async" className="photo" />
        ))}
      </div>
      <Link to="/galeria" className="btn-outline-gold mt-3.5 w-full">
        VER GALERIA COMPLETA
      </Link>
    </section>
  );
}

function Servicos() {
  return (
    <section className="px-[18px] py-[22px]">
      <SectionHead title="Serviços" tag="Preços" />
      <div className="grid gap-[9px]">
        {barbearia.servicos.map((s) => (
          <Link
            key={s.nome}
            to="/agendar"
            search={{ servico: s.nome }}
            className="flex items-center justify-between gap-3 rounded-[14px] border bg-card p-[15px] no-underline transition-colors hover:border-gold"
          >
            <div className="min-w-0">
              <strong className="text-sm">{s.nome}</strong>
              {s.nota ? <small className="mt-1 block text-xs text-muted-foreground">{s.nota}</small> : null}
            </div>
            <span className="whitespace-nowrap text-right font-extrabold text-gold-light">
              {s.aPartirDe ? <small className="block text-[10px] font-normal text-muted-foreground">a partir de</small> : null}
              {formatBRL(s.preco)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Equipe() {
  return (
    <section className="px-[18px] py-[22px]">
      <SectionHead title="Quem cuida de você" tag="Equipe" />
      <div className="grid grid-cols-2 gap-[9px]">
        {barbearia.equipe.map((b) => (
          <div key={b.nome} className="rounded-[14px] border bg-card p-3 text-center">
            <img
              src={b.foto}
              alt={`Retrato de ${b.nome}`}
              width={300}
              height={300}
              loading="lazy"
              className="mx-auto aspect-square w-full rounded-full border border-gold object-cover"
            />
            <strong className="mt-2.5 block text-sm">{b.nome}</strong>
            <small className="text-xs text-muted-foreground">Barbeiro</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function Avaliacoes() {
  return (
    <section className="px-[18px] py-[22px]">
      <div className="feature-card p-[19px] text-center">
        <div className="flex justify-center gap-1.5 text-gold" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-6 fill-current" />
          ))}
        </div>
        <h3 className="my-2 font-display text-[22px] font-bold text-gold-light">{barbearia.nota} no Google</h3>
        <p className="text-[13px] leading-normal text-soft">
          <strong className="text-gold-light">{barbearia.totalAvaliacoes} avaliações</strong> de clientes que já
          passaram pela cadeira.
        </p>
        <a href={barbearia.avaliacoesUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold mt-2">
          VER AVALIAÇÕES
        </a>
      </div>
    </section>
  );
}

function InstallCard() {
  const { canShow, install } = useInstall();
  if (!canShow) return null;
  return (
    <section className="px-[18px] py-[22px]">
      <div className="flex items-center gap-3.5 rounded-2xl border bg-card p-3.5">
        <img src="/icon-192.png" alt="" width={56} height={56} className="size-14 flex-none rounded-[14px] border" />
        <div className="min-w-0 flex-1">
          <h3 className="mb-0.5 font-display text-base font-bold text-gold-light">Tenha o app no celular</h3>
          <p className="text-xs leading-snug text-muted-foreground">Agende em dois toques, direto da tela inicial.</p>
        </div>
        <button type="button" onClick={install} className="btn-gold flex-none px-3.5 py-[11px]">
          BAIXAR
        </button>
      </div>
    </section>
  );
}

function Contato() {
  const wa = whatsappLink(barbearia.whatsapp, `Olá, quero agendar um horário na ${barbearia.nome}.`);
  return (
    <section className="px-[18px] py-[22px]">
      <SectionHead title="Encontre a gente" tag="Contato" />
      <div className="space-y-2.5 rounded-2xl border bg-card p-4 text-[13px] leading-relaxed text-soft [&_a]:text-gold-light [&_a]:no-underline">
        <p className="flex gap-2">
          <MapPin className="mt-0.5 size-4 flex-none text-gold" aria-hidden />
          <span>
            {barbearia.endereco} —{" "}
            <a href={barbearia.mapaUrl} target="_blank" rel="noopener noreferrer">
              ver no mapa
            </a>
          </span>
        </p>
        <div className="flex gap-2">
          <Clock className="mt-0.5 size-4 flex-none text-gold" aria-hidden />
          <ul>
            {barbearia.horarioResumo.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
        <p className="flex gap-2">
          <Instagram className="mt-0.5 size-4 flex-none text-gold" aria-hidden />
          <a href={`https://www.instagram.com/${barbearia.instagram}`} target="_blank" rel="noopener noreferrer">
            @{barbearia.instagram}
          </a>
        </p>
        <p className="flex gap-2">
          <MessageCircle className="mt-0.5 size-4 flex-none text-gold" aria-hidden />
          <a href={whatsappLink(barbearia.whatsapp)} target="_blank" rel="noopener noreferrer">
            {barbearia.whatsappExibicao}
          </a>
        </p>
        <div className="grid gap-2 pt-1">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold w-full !text-primary-foreground">
            FALAR NO WHATSAPP
          </a>
          <a href={`https://www.instagram.com/${barbearia.instagram}`} target="_blank" rel="noopener noreferrer" className="btn-outline-gold w-full">
            ABRIR NO INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
}
