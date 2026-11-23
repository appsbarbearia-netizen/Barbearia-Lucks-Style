/** Dados do cliente. Para um novo cliente, troque este arquivo e as fotos. */
import type { WeekHours } from "@/lib/agenda";

import logo from "@/assets/lucks/logo.webp.asset.json";
import capaLarga from "@/assets/lucks/capa-larga.webp.asset.json";
import socialDegrade from "@/assets/lucks/social-degrade.webp.asset.json";
import afroNavalhado from "@/assets/lucks/afro-navalhado.webp.asset.json";
import freestyleNuca from "@/assets/lucks/freestyle-nuca.webp.asset.json";
import luzesAzul from "@/assets/lucks/luzes-azul.webp.asset.json";
import afroDourado from "@/assets/lucks/afro-dourado.webp.asset.json";
import lowFade from "@/assets/lucks/low-fade.webp.asset.json";
import luzesAzulPerfil from "@/assets/lucks/luzes-azul-perfil.webp.asset.json";
import curtoFeminino from "@/assets/lucks/curto-feminino.webp.asset.json";
import lucas from "@/assets/lucks/barbeiro-lucas-paulo.webp.asset.json";
import marques from "@/assets/lucks/barbeiro-marques-alexandre.webp.asset.json";
import th from "@/assets/lucks/barbeiro-th-santos.webp.asset.json";
import gabriel from "@/assets/lucks/barbeiro-gabriel-choque.webp.asset.json";

export type Servico = { nome: string; preco: number; aPartirDe?: boolean; nota?: string };
export type Foto = { src: string; alt: string; pos?: string };

const terASex = { open: "10:00", close: "20:00" };
const horarios: WeekHours = [null, null, terASex, terASex, terASex, terASex, { open: "09:00", close: "18:00" }];

const fotos: Foto[] = [
  { src: socialDegrade.url, alt: "Corte social com degradê e risca" },
  { src: afroNavalhado.url, alt: "Cabelo crespo com degradê e risca lateral" },
  { src: freestyleNuca.url, alt: "Desenho freestyle na nuca" },
  { src: luzesAzul.url, alt: "Luzes azuis em corte infantil" },
  { src: afroDourado.url, alt: "Black com luzes douradas e degradê" },
  { src: lowFade.url, alt: "Degradê baixo com topo curto" },
  { src: luzesAzulPerfil.url, alt: "Luzes azuis, vista lateral" },
  { src: curtoFeminino.url, alt: "Corte curto com nuca batida" },
];

export const barbearia = {
  nome: "Luck's Style",
  nomeCompleto: "Barbearia Luck's Style",
  slogan: "Barbearia desde 2017",
  sloganPequeno: "Barbearia · desde 2017",
  descricao:
    "Barbearia Luck's Style em Vila Matilde, São Paulo. Corte, barba, luzes e tratamentos desde 2017. Agende pelo WhatsApp.",
  descricaoCurta: "Corte, barba e tratamentos em Vila Matilde (SP). Agende seu horário pelo app.",
  logo: logo.url,
  capa: capaLarga.url,
  whatsapp: "5511970941300",
  whatsappExibicao: "(11) 97094-1300",
  instagram: "barbearialucksstyle",
  endereco: "Av. Waldemar Carlos Pereira, 1886 – Vila Matilde, São Paulo – SP, 03533-003",
  enderecoCurto: "Av. Waldemar Carlos Pereira, 1886 – Vila Matilde",
  mapaUrl: "https://maps.app.goo.gl/g1p7hScsiDcic8SS6",
  agendaOnlineUrl: "https://bfpro.com.br/lucks-style",
  avaliacoesUrl: "https://g.page/r/CXX-kvssaPLiEAE/review",
  nota: "5,0",
  totalAvaliacoes: 403,
  horarios,
  horarioResumo: ["Terça a sexta: 10h às 20h", "Sábado: 9h às 18h", "Domingo e segunda: fechado"],
  servicos: [
    { nome: "Corte", preco: 45 },
    { nome: "Barba", preco: 40 },
    { nome: "Corte Raspado", preco: 35 },
    { nome: "Primeiro Corte", preco: 34.99, nota: "Válido no primeiro atendimento" },
    { nome: "Pezinho", preco: 15 },
    { nome: "Luzes", preco: 88, aPartirDe: true },
    { nome: "Choque Redutor de Frizz", preco: 65 },
    { nome: "Hidratação Capilar Vapor de Ozônio", preco: 50 },
    { nome: "Argiloterapia Facial", preco: 45 },
    { nome: "Limpeza de Pele Vapor de Ozônio", preco: 45 },
    { nome: "Coloração de Grisalhos", preco: 35, nota: "Cabelo ou barba" },
    { nome: "Depilação na Cera", preco: 20, nota: "Nariz ou orelha" },
  ] satisfies Servico[] as Servico[],
  equipe: [
    { nome: "Lucas Paulo", foto: lucas.url },
    { nome: "Marques Alexandre", foto: marques.url },
    { nome: "TH Santos", foto: th.url },
    { nome: "Gabriel Choque", foto: gabriel.url },
  ],
  vitrine: fotos.slice(0, 6),
  galeria: fotos,
  regras: [
    "Atendemos também por ordem de chegada, conforme a agenda do dia.",
    "Temos planos de assinatura. Pergunte no WhatsApp.",
    "Primeiro Corte por R$ 34,99, válido no primeiro atendimento.",
  ],
} as const;

export function servicoLabel(s: Servico): string {
  const preco = `R$ ${s.preco.toFixed(2).replace(".", ",")}`;
  return `${s.nome} — ${s.aPartirDe ? "a partir de " : ""}${preco}`;
}
