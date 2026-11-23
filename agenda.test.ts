import { describe, expect, it } from "vitest";

import { barbearia } from "@/config/barbearia";
import { buildBookingMessage, formatBRL, slotsForDate } from "@/lib/agenda";

const week = barbearia.horarios;
// 23/11/2026 é segunda-feira.
const longAgo = new Date(2026, 0, 1, 8, 0);

describe("Horário da Luck's Style", () => {
  it("terça a sexta: primeiro horário 10:00 e último 19:30 (fecha às 20h)", () => {
    for (const day of ["2026-11-24", "2026-11-25", "2026-11-26", "2026-11-27"]) {
      const { slots, closed } = slotsForDate(day, week, longAgo);
      expect(closed).toBe(false);
      expect(slots[0]).toBe("10:00");
      expect(slots.at(-1)).toBe("19:30");
    }
  });

  it("sábado: primeiro horário 09:00 e último 17:30 (fecha às 18h)", () => {
    const { slots } = slotsForDate("2026-11-28", week, longAgo);
    expect(slots[0]).toBe("09:00");
    expect(slots.at(-1)).toBe("17:30");
  });

  it("domingo e segunda ficam fechados", () => {
    expect(slotsForDate("2026-11-29", week, longAgo)).toEqual({ closed: true, slots: [] });
    expect(slotsForDate("2026-11-30", week, longAgo)).toEqual({ closed: true, slots: [] });
  });

  it("hoje só mostra horários que ainda não passaram", () => {
    const now = new Date(2026, 10, 24, 18, 40);
    expect(slotsForDate("2026-11-24", week, now).slots).toEqual(["19:00", "19:30"]);
  });

  it("dia que já passou não tem horários", () => {
    const now = new Date(2026, 10, 25, 9, 0);
    expect(slotsForDate("2026-11-24", week, now).slots).toEqual([]);
  });
});

describe("Pedido pelo WhatsApp", () => {
  it("vai para o número (11) 97094-1300", () => {
    expect(barbearia.whatsapp).toBe("5511970941300");
  });

  it("leva nome, serviço, barbeiro, data e horário", () => {
    const msg = buildBookingMessage({
      shopName: "Luck's Style",
      nome: "Rafael",
      servico: "Corte — R$ 45,00",
      barbeiro: "TH Santos",
      dataISO: "2026-11-28",
      hora: "09:30",
    });
    expect(msg).toContain("Nome: Rafael");
    expect(msg).toContain("Barbeiro: TH Santos");
    expect(msg).toContain("Data: 28/11/2026");
    expect(msg).toContain("Horário desejado: 09:30");
  });
});

describe("Preços", () => {
  it("Corte R$ 45,00 e Primeiro Corte R$ 34,99", () => {
    const preco = (nome: string) => barbearia.servicos.find((s) => s.nome === nome)?.preco;
    expect(preco("Corte")).toBe(45);
    expect(preco("Primeiro Corte")).toBe(34.99);
    expect(formatBRL(34.99)).toBe("R$ 34,99");
  });
});
