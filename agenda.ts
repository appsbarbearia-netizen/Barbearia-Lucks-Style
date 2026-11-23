/** Regras de agenda da barbearia: horário por dia da semana, horários livres e mensagem do WhatsApp. */

export type DayHours = { open: string; close: string } | null;
/** Índice igual a Date.getDay(): 0 = domingo ... 6 = sábado. */
export type WeekHours = readonly [DayHours, DayHours, DayHours, DayHours, DayHours, DayHours, DayHours];

export const SLOT_MINUTES = 30;

export function toMinutes(hhmm: string): number {
  const [h = "0", m = "0"] = hhmm.split(":");
  return Number(h) * 60 + Number(m);
}

function fromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** Horários de início possíveis: do abrir até o último encaixe antes de fechar. */
export function slotsForDay(hours: DayHours, step = SLOT_MINUTES): string[] {
  if (!hours) return [];
  const out: string[] = [];
  for (let t = toMinutes(hours.open); t + step <= toMinutes(hours.close); t += step) {
    out.push(fromMinutes(t));
  }
  return out;
}

/** "AAAA-MM-DD" no fuso do aparelho. */
export function localISO(d: Date): string {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

export function weekdayOf(dateISO: string): number {
  return new Date(`${dateISO}T12:00:00`).getDay();
}

export type DateSlots = { closed: boolean; slots: string[] };

export function slotsForDate(dateISO: string, week: WeekHours, now: Date): DateSlots {
  const hours = week[weekdayOf(dateISO)] ?? null;
  if (!hours) return { closed: true, slots: [] };
  let slots = slotsForDay(hours);
  const today = localISO(now);
  if (dateISO < today) return { closed: false, slots: [] };
  if (dateISO === today) {
    const nowMin = now.getHours() * 60 + now.getMinutes();
    slots = slots.filter((s) => toMinutes(s) > nowMin);
  }
  return { closed: false, slots };
}

export function formatBRL(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

export function formatDateBR(dateISO: string): string {
  const [y, m, d] = dateISO.split("-");
  return `${d}/${m}/${y}`;
}

export type BookingRequest = {
  shopName: string;
  nome: string;
  servico: string;
  barbeiro: string;
  dataISO: string;
  hora: string;
};

export function buildBookingMessage(r: BookingRequest): string {
  return [
    `Olá, ${r.shopName}! Quero solicitar um agendamento.`,
    "",
    `Nome: ${r.nome}`,
    `Serviço: ${r.servico}`,
    `Barbeiro: ${r.barbeiro}`,
    `Data: ${formatDateBR(r.dataISO)}`,
    `Horário desejado: ${r.hora}`,
    "",
    "Podem confirmar a disponibilidade?",
  ].join("\n");
}

export function whatsappLink(number: string, text?: string): string {
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
