"use client";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ueb-development/ui/components/dropdown-menu";
import { Button } from "@ueb-development/ui/components/button";
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

function getCookieLang(): string {
  if (typeof document === "undefined") return "es";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (m) return m[1].split("/").pop() || "es";
  return "es";
}

function ensureGtElementLoaded(): void {
  const w = window as unknown as { gt_translate_script?: HTMLScriptElement | null };
  if (w.gt_translate_script) return;
  const existing = document.getElementById("google_translate_element2");
  if (existing && existing.innerHTML.length > 0) return;
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2";
  document.body.appendChild(s);
  w.gt_translate_script = s;
}

function setGtCookie(code: string) {
  const value =
    code === "es"
      ? "googtrans=/es/es; path=/; max-age=31536000; SameSite=Lax"
      : `googtrans=/es/${code}; path=/; max-age=31536000; SameSite=Lax`;
  document.cookie = value;
}

export default function GTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(getCookieLang);

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
    document.body.appendChild(script);
  }, []);

  const handleLanguage = (code: string) => {
    const pair = code === "es" ? "es|es" : `es|${code}`;
    setGtCookie(code);
    setCurrent(code);
    const w = window as unknown as { doGTranslate?: (pair: string) => void };
    if (typeof w.doGTranslate === "function") {
      ensureGtElementLoaded();
      w.doGTranslate(pair);
    } else {
      window.location.reload();
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Cambiar idioma"
          className="text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
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
        </Button>
      </DropdownMenuTrigger>

      <div className="gtranslate_wrapper opacity-0 pointer-events-none absolute" style={{ height: 1, width: 1, overflow: "hidden" }} />

      <DropdownMenuContent align="end" className="w-44">
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