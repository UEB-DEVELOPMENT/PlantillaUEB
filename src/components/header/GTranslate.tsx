"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ueb-development/ui-core/components/dropdown-menu";
import { Button } from "@ueb-development/ui-core/components/button";
import { CheckIcon } from "lucide-react";

declare global {
  interface Window {
    gtranslateSettings: Record<string, unknown>;
    doGTranslate?: (value: string) => void;
  }
}

const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
  { code: "zh-CN", label: "简体中文" },
];

// GTranslate (dwf.js + lib.min.js) guarda el idioma elegido en localStorage.
const GT_STORAGE_KEY = "__GT_TRANSLATE_LANGS";

function getStoredLang(): string {
  try {
    const stored = JSON.parse(localStorage.getItem(GT_STORAGE_KEY) ?? "null");
    if (stored && typeof stored.tgtLang === "string") return stored.tgtLang;
  } catch {
    // localStorage no disponible o valor corrupto
  }
  return "es";
}

// dwf.js marca con window.gt_translate_script que ya pidió lib.min.js, pero si
// se llama a doGTranslate antes de que esa librería termine de cargar, falla con
// "__GT is not defined". Por eso se espera a su evento load.
function translateWhenReady(pair: string) {
  const w = window as unknown as {
    __GT?: unknown;
    gt_translate_script?: HTMLScriptElement;
  };
  const run = () => window.doGTranslate?.(pair);
  if (w.__GT || !w.gt_translate_script) run();
  else w.gt_translate_script.addEventListener("load", run, { once: true });
}

function subscribeStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

export default function GTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  // En el servidor se asume "es" para que el HTML coincida; en el cliente se
  // lee el idioma guardado por GTranslate.
  const storedLang = useSyncExternalStore(subscribeStorage, getStoredLang, () => "es");
  const [selected, setSelected] = useState<string | null>(null);
  const current = selected ?? storedLang;
  const pendingPair = useRef<string | null>(null);

  useEffect(() => {
    const handler = () => setIsOpen(false);
    window.addEventListener("close-header-dropdowns", handler);
    return () => window.removeEventListener("close-header-dropdowns", handler);
  }, []);

  useEffect(() => {
    if (document.getElementById("gtranslate-script")) return;

    window.gtranslateSettings = {
      default_language: "es",
      languages: ["es", "en", "fr", "pt", "it", "zh-CN"],
      wrapper_selector: ".gtranslate_wrapper",
      switcher_horizontal_position: "inline",
    };

    const script = document.createElement("script");
    script.id = "gtranslate-script";
    script.src = "https://cdn.gtranslate.net/widgets/latest/dwf.js";
    script.defer = true;
    // Al cargar el script se aplica el idioma elegido mientras cargaba o, si no
    // hay ninguno, el guardado de una visita anterior (dwf.js no lo reaplica solo).
    script.addEventListener("load", () => {
      if (pendingPair.current) {
        translateWhenReady(pendingPair.current);
        pendingPair.current = null;
        return;
      }
      const stored = getStoredLang();
      if (stored === "es") return;
      // Se espera a que la página termine de cargar: si se traduce mientras React
      // aún hidrata, React restaura el texto original del servidor.
      const apply = () => setTimeout(() => translateWhenReady(`es|${stored}`), 0);
      if (document.readyState === "complete") apply();
      else window.addEventListener("load", apply, { once: true });
    });
    document.body.appendChild(script);
  }, []);

  const handleLanguage = (code: string) => {
    const pair = `es|${code}`;
    setSelected(code);
    if (window.doGTranslate) {
      translateWhenReady(pair);
    } else {
      pendingPair.current = pair;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label="Cambiar idioma" className="text-navbar-foreground hover:bg-white/10 hover:text-navbar-foreground" />}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </DropdownMenuTrigger>

      <div className="gtranslate_wrapper opacity-0 pointer-events-none absolute" style={{ height: 1, width: 1, overflow: "hidden" }} />

      <DropdownMenuContent align="end" className="notranslate w-44">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguage(lang.code)}
          >
            {lang.label}
            {lang.code === current && <CheckIcon className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}