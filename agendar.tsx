import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import { SectionHead } from "@/components/app/AppShell";
import { barbearia, servicoLabel } from "@/config/barbearia";
import { buildBookingMessage, localISO, slotsForDate, whatsappLink } from "@/lib/agenda";

type Search = { servico?: string };

export const Route = createFileRoute("/agendar")({
  validateSearch: (s: Record<string, unknown>): Search =>
    typeof s["servico"] === "string" ? { servico: s["servico"] } : {},
  head: () => ({
    meta: [
      { title: "Agendar horário | Luck's Style Barbearia" },
      { name: "description", content: "Escolha serviço, barbeiro, dia e horário na Luck's Style e envie o pedido pelo WhatsApp." },
      { property: "og:title", content: "Agendar horário | Luck's Style Barbearia" },
      { property: "og:description", content: "Monte seu pedido de agendamento e envie pelo WhatsApp da barbearia." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Agendar,
});

const SEM_PREFERENCIA = "Sem preferência";
const labelCls = "text-xs uppercase tracking-[1px] text-gold-light";

function Agendar() {
  const { servico: servicoInicial } = Route.useSearch();
  const inicial = barbearia.servicos.find((s) => s.nome === servicoInicial) ?? barbearia.servicos[0];

  const [nome, setNome] = useState("");
  const [servico, setServico] = useState(inicial?.nome ?? "");
  const [barbeiro, setBarbeiro] = useState(SEM_PREFERENCIA);
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    setNow(new Date());
  }, []);

  useEffect(() => {
    if (inicial) setServico(inicial.nome);
  }, [inicial]);

  const dia = useMemo(() => (data && now ? slotsForDate(data, barbearia.horarios, now) : null), [data, now]);
  const slots = dia?.slots ?? [];

  useEffect(() => {
    setHora((h) => (slots.includes(h) ? h : (slots[0] ?? "")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slots.join(",")]);

  const hint = !dia
    ? null
    : dia.closed
      ? "Fechado neste dia. Atendemos de terça a sábado."
      : slots.length === 0
        ? "Não há mais horários neste dia. Escolha outra data."
        : null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return setErro("Diga como podemos te chamar.");
    if (!data) return setErro("Escolha a data.");
    if (!hora) return setErro("Escolha uma data com horário disponível.");
    setErro(null);
    const s = barbearia.servicos.find((x) => x.nome === servico);
    const texto = buildBookingMessage({
      shopName: barbearia.nome,
      nome: nome.trim(),
      servico: s ? servicoLabel(s) : servico,
      barbeiro,
      dataISO: data,
      hora,
    });
    window.open(whatsappLink(barbearia.whatsapp, texto), "_blank", "noopener");
  }

  return (
    <section className="px-[18px] py-[22px]">
      <SectionHead title="Agende seu horário" tag="Reserva" />
      <form className="grid gap-3.5" noValidate onSubmit={onSubmit}>
        <label className={labelCls}>
          Seu nome
          <input
            className="field"
            required
            autoComplete="given-name"
            placeholder="Como podemos te chamar?"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>
        <label className={labelCls}>
          Serviço
          <select className="field" value={servico} onChange={(e) => setServico(e.target.value)}>
            {barbearia.servicos.map((s) => (
              <option key={s.nome} value={s.nome}>
                {servicoLabel(s)}
              </option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Barbeiro
          <select className="field" value={barbeiro} onChange={(e) => setBarbeiro(e.target.value)}>
            <option>{SEM_PREFERENCIA}</option>
            {barbearia.equipe.map((b) => (
              <option key={b.nome}>{b.nome}</option>
            ))}
          </select>
        </label>
        <label className={labelCls}>
          Data
          <input
            className="field"
            type="date"
            required
            min={now ? localISO(now) : undefined}
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          {hint ? <span className="mt-1.5 block text-xs normal-case tracking-normal text-warning">{hint}</span> : null}
        </label>
        <label className={labelCls}>
          Horário
          <select className="field" value={hora} disabled={slots.length === 0} onChange={(e) => setHora(e.target.value)}>
            {slots.length ? (
              slots.map((h) => <option key={h}>{h}</option>)
            ) : (
              <option value="">{data ? "Sem horários" : "Escolha a data primeiro"}</option>
            )}
          </select>
        </label>
        {erro ? (
          <p role="alert" className="text-sm text-warning">
            {erro}
          </p>
        ) : null}
        <button className="btn-gold" type="submit">
          CONTINUAR PELO WHATSAPP →
        </button>
      </form>

      <ul className="rule-list mt-3.5">
        {barbearia.horarioResumo.map((r) => (
          <li key={r}>{r}</li>
        ))}
        {barbearia.regras.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-normal text-muted-foreground">
        Seu pedido é enviado pelo WhatsApp. O horário só fica garantido depois da confirmação da barbearia.
      </p>

      <div className="mt-5 rounded-2xl border bg-card p-4 text-center">
        <p className="mb-2.5 text-[13px] text-soft">Prefere ver a agenda e marcar sozinho?</p>
        <a href={barbearia.agendaOnlineUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-gold w-full">
          ABRIR AGENDA ONLINE
        </a>
      </div>
    </section>
  );
}
