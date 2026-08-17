"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ueb-development/ui/components/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@ueb-development/ui/components/avatar";
import { Button } from "@ueb-development/ui/components/button";
import { ChevronDown } from "lucide-react";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(false);
    window.addEventListener("close-header-dropdowns", handler);
    return () => window.removeEventListener("close-header-dropdowns", handler);
  }, []);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 px-2 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
        >
          <Avatar size="sm" className="ring-2 ring-white/30">
            <AvatarImage
              src="/images/user/owner.jpg"
              alt="Usuario"
              width={44}
              height={44}
            />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <span className="hidden font-medium text-sm sm:block">
            Administrador
          </span>
          <ChevronDown className="text-primary-foreground/70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>
          <span className="block text-sm font-medium text-foreground">
            Administrador UEB
          </span>
          <span className="mt-0.5 block text-xs text-muted-foreground">
            admin@ueb.edu.ec
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <a href="/profile">Editar perfil</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/profile">Configuración de cuenta</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/profile">Soporte</a>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" asChild>
          <a href="/signin">Cerrar sesión</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}