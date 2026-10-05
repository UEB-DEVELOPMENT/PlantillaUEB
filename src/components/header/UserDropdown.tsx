"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ueb-development/ui-core/components/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@ueb-development/ui-core/components/avatar";
import { Button } from "@ueb-development/ui-core/components/button";
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
      <DropdownMenuTrigger
        render={<Button variant="ghost" className="gap-2 px-2 text-navbar-foreground hover:bg-white/10 hover:text-navbar-foreground" />}
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
        <ChevronDown className="text-navbar-foreground/70" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <span className="block text-sm font-medium text-foreground">
              Administrador UEB
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              admin@ueb.edu.ec
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem render={<a href="/profile" />}>
          Editar perfil
        </DropdownMenuItem>
        <DropdownMenuItem render={<a href="/profile" />}>
          Configuración de cuenta
        </DropdownMenuItem>
        <DropdownMenuItem render={<a href="/profile" />}>
          Soporte
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive" render={<a href="/signin" />}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}