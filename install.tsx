import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { barbearia } from "@/config/barbearia";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

type Help = { title: string; intro: string; steps: ReactNode[] };

type InstallCtx = { canShow: boolean; install: () => void };

const Ctx = createContext<InstallCtx>({ canShow: false, install: () => {} });

export function useInstall() {
  return useContext(Ctx);
}

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function helpFor(): Help {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const inApp = /Instagram|FBAN|FBAV|FB_IAB|Line\/|MicroMessenger|TikTok/i.test(ua);
  const isAndroid = /Android/.test(ua);
  if (inApp) {
    return {
      title: "Abra no navegador",
      intro: `O navegador do Instagram não permite instalar apps. Abra esta página no ${isIOS ? "Safari" : "Chrome"}:`,
      steps: [
        <>Toque nos <strong>três pontinhos</strong> (⋯ ou ⋮) no canto da tela</>,
        <>Escolha <strong>Abrir no navegador</strong></>,
        <>Depois toque em <strong>Baixar app</strong> de novo</>,
      ],
    };
  }
  if (isIOS) {
    return {
      title: "Instalar no iPhone",
      intro: "No iPhone, a instalação é feita pelo Safari:",
      steps: [
        <>Abra esta página no <strong>Safari</strong></>,
        <>Toque no botão <strong>Compartilhar</strong> (quadrado com seta)</>,
        <>Escolha <strong>Adicionar à Tela de Início</strong></>,
        <>Toque em <strong>Adicionar</strong></>,
      ],
    };
  }
  if (isAndroid) {
    return {
      title: "Instalar no Android",
      intro: "Se a janela de instalação não abriu sozinha, faça pelo Chrome:",
      steps: [
        <>Toque nos <strong>três pontinhos</strong> (⋮) no canto superior</>,
        <>Escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong></>,
        <>Confira se o <strong>logo {barbearia.nome}</strong> aparece antes de confirmar</>,
      ],
    };
  }
  return {
    title: "Instalar no computador",
    intro: "No Chrome ou Edge:",
    steps: [
      <>Clique no ícone de <strong>instalar</strong> na barra de endereço</>,
      <>Ou abra o menu ⋮ e escolha <strong>Instalar {barbearia.nome}</strong></>,
    ],
  };
}

export function InstallProvider({ children }: { children: ReactNode }) {
  const [canShow, setCanShow] = useState(false);
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);
  const [help, setHelp] = useState<Help | null>(null);

  useEffect(() => {
    setCanShow(!isStandalone());
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as InstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setCanShow(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const install = useCallback(() => {
    if (deferred) {
      const p = deferred;
      setDeferred(null);
      p.prompt()
        .then(() => p.userChoice)
        .then((choice) => {
          if (choice.outcome === "accepted") setCanShow(false);
        })
        .catch(() => setHelp(helpFor()));
      return;
    }
    setHelp(helpFor());
  }, [deferred]);

  return (
    <Ctx.Provider value={{ canShow, install }}>
      {children}
      <Dialog open={help !== null} onOpenChange={(o) => !o && setHelp(null)}>
        <DialogContent className="w-[min(92vw,420px)] rounded-2xl border-gold bg-popover">
          <DialogTitle className="font-display text-xl text-gold-light">{help?.title}</DialogTitle>
          <DialogDescription className="text-sm leading-relaxed text-soft">{help?.intro}</DialogDescription>
          <ol className="list-decimal space-y-1 pl-5 text-sm leading-relaxed text-foreground [&_strong]:text-gold-light">
            {help?.steps.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
          <button type="button" className="btn-gold w-full" onClick={() => setHelp(null)}>
            ENTENDI
          </button>
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
