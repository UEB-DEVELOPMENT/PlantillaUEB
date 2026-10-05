"use client";
import Link from "next/link";
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
import { Avatar, AvatarImage } from "@ueb-development/ui-core/components/avatar";
import { Badge } from "@ueb-development/ui-core/components/badge";
import { Button } from "@ueb-development/ui-core/components/button";
import { Bell } from "lucide-react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  useEffect(() => {
    const handler = () => setIsOpen(false);
    window.addEventListener("close-header-dropdowns", handler);
    return () => window.removeEventListener("close-header-dropdowns", handler);
  }, []);

  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("close-header-dropdowns"));
    setNotifying(false);
  };

  const notifications = [
    {
      image: "/images/user/user-02.jpg",
      user: "Terry Franci",
      text: "solicita permiso para cambiar",
      project: "Proyecto - Nganter App",
      time: "hace 5 min",
    },
    {
      image: "/images/user/user-03.jpg",
      user: "Alena Franci",
      text: "requests permission to change",
      project: "Proyecto - Nganter App",
      time: "hace 8 min",
    },
    {
      image: "/images/user/user-04.jpg",
      user: "Jocelyn Kenter",
      text: "solicita permiso para cambiar",
      project: "Proyecto - Nganter App",
      time: "hace 15 min",
    },
    {
      image: "/images/user/user-05.jpg",
      user: "Brandon Philips",
      text: "requests permission to change",
      project: "Proyecto - Nganter App",
      time: "hace 1 hora",
    },
    {
      image: "/images/user/user-02.jpg",
      user: "Terry Franci",
      text: "solicita permiso para cambiar",
      project: "Proyecto - Nganter App",
      time: "hace 5 min",
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        render={<Button onClick={handleClick} variant="ghost" size="icon-sm" aria-label="Notificaciones" className="relative text-navbar-foreground hover:bg-white/10 hover:text-navbar-foreground" />}
      >
        <Bell />
        {notifying && (
          <Badge className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-warning p-0 text-transparent">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-warning" />
          </Badge>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[min(92vw,361px)] bg-popover p-2"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center justify-between border-b border-border pb-3">
            <span className="text-lg font-semibold text-foreground">
              Notificaciones
            </span>
            <Badge variant="secondary">{notifications.length}</Badge>
          </DropdownMenuLabel>
        </DropdownMenuGroup>

        <div className="max-h-96 overflow-y-auto">
          {notifications.map((item, index) => (
            <DropdownMenuItem
              key={index}
              className="flex items-start gap-3 rounded-lg border-b border-border py-3"
            >
              <Avatar className="size-10">
                <AvatarImage
                  src={item.image}
                  alt={item.user}
                  width={40}
                  height={40}
                />
              </Avatar>
              <span className="block text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{item.user}</span>{" "}
                {item.text}{" "}
                <span className="font-medium text-foreground">
                  {item.project}
                </span>
                <span className="mt-1 flex items-center gap-2 text-xs">
                  Proyecto
                  <span className="size-1 rounded-full bg-muted-foreground" />
                  {item.time}
                </span>
              </span>
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="justify-center py-2.5" render={<Link href="/" />}>
          Ver todas las notificaciones
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}