"use client";

import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import GTranslate from "@/components/header/GTranslate";
import { Button } from "@ueb-development/ui/components/button";
import { Input } from "@ueb-development/ui/components/input";
import { Kbd } from "@ueb-development/ui/components/kbd";
import { SidebarTrigger } from "@ueb-development/ui/components/sidebar";
import React, { useState, useEffect, useRef } from "react";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleApplicationMenu = () => {
    window.dispatchEvent(new CustomEvent("close-header-dropdowns"));
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full items-center gap-3 border-b bg-primary px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center gap-2 lg:gap-4">
        <SidebarTrigger className="text-primary-foreground" />

        <div className="hidden flex-1 justify-center lg:flex">
          <form className="w-full max-w-md xl:max-w-[430px]">
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Buscar o escribir comando..."
                className="h-10 rounded-4xl border-white/20 bg-white/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:border-white/40"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-foreground/70"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  fill="currentColor"
                />
              </svg>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1.5 top-1/2 h-7 -translate-y-1/2 rounded-full px-2 text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
              >
                <Kbd className="bg-white/10 text-primary-foreground/80">⌘ K</Kbd>
              </Button>
            </div>
          </form>
        </div>

        <div className="ml-auto flex items-center gap-2 lg:ml-0 2xsm:gap-3">
          <GTranslate />

          <NotificationDropdown />

          <UserDropdown />

          <Button
            onClick={toggleApplicationMenu}
            variant="ghost"
            size="icon-sm"
            aria-label="Menú de aplicación"
            className="text-primary-foreground hover:bg-white/10 lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                fill="currentColor"
              />
            </svg>
          </Button>
        </div>
      </div>

      {isApplicationMenuOpen && (
        <div className="absolute inset-x-0 top-full z-50 flex flex-col items-center gap-3 border-t border-white/10 bg-primary p-4 lg:hidden">
          <div className="w-full max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar o escribir comando..."
                className="h-10 rounded-4xl border-white/20 bg-white/10 pl-10 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-foreground/70"
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default AppHeader;