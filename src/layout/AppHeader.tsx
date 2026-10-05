"use client";

import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import GTranslate from "@/components/header/GTranslate";
import {
  Navbar,
  NavbarCenter,
  NavbarEnd,
  NavbarStart,
} from "@ueb-development/ui-core/components/navbar";
import { SidebarTrigger } from "@ueb-development/ui-core/components/sidebar";
import React from "react";

const AppHeader: React.FC = () => {
  return (
    <Navbar position="sticky" className="sm:px-6">
      {/* NavbarStart y NavbarEnd ocupan el mismo ancho, así el nombre queda centrado */}
      <NavbarStart>
        <SidebarTrigger className="text-navbar-foreground hover:bg-white/10 hover:text-navbar-foreground" />
      </NavbarStart>

      <NavbarCenter>
        <span className="notranslate truncate font-brand text-lg sm:text-xl">
          Plantilla UEB
        </span>
      </NavbarCenter>

      <NavbarEnd className="2xsm:gap-3">
        <GTranslate />

        <NotificationDropdown />

        <UserDropdown />
      </NavbarEnd>
    </Navbar>
  );
};

export default AppHeader;
