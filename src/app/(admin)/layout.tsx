"use client";

import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@ueb-development/ui/components/sidebar";
import { TooltipProvider } from "@ueb-development/ui/components/tooltip";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <TooltipProvider>
        <AppSidebar />
        <SidebarInset>
          <AppHeader />
          <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 md:p-6">
            <div className="mx-auto w-full max-w-(--breakpoint-2xl)">
              {children}
            </div>
          </div>
        </SidebarInset>
      </TooltipProvider>
    </SidebarProvider>
  );
}
