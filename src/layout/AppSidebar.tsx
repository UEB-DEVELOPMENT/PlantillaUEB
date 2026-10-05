"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ueb-development/ui-core/components/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from "@ueb-development/ui-core/components/sidebar";
import {
  Boxes,
  CalendarDays,
  ChartLine,
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LifeBuoy,
  LogIn,
  LogOut,
  Table2,
  UserCircle,
} from "lucide-react";
import Image from "next/image";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string }[];
};

const navItems: NavItem[] = [
  {
    icon: <LayoutDashboard />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <CalendarDays />,
    name: "Calendario",
    path: "/calendar",
  },
  {
    icon: <UserCircle />,
    name: "Perfil de Usuario",
    path: "/profile",
  },
  {
    name: "Formularios",
    icon: <ClipboardList />,
    subItems: [{ name: "Elementos de Formulario", path: "/form-elements" }],
  },
  {
    name: "Tablas",
    icon: <Table2 />,
    subItems: [{ name: "Tablas Básicas", path: "/basic-tables" }],
  },
  {
    name: "Páginas",
    icon: <FileText />,
    subItems: [
      { name: "Página en Blanco", path: "/blank" },
      { name: "Error 404", path: "/error-404" },
    ],
  },
];

const othersItems: NavItem[] = [
  {
    icon: <ChartLine />,
    name: "Gráficos",
    subItems: [
      { name: "Gráfico de Líneas", path: "/line-chart" },
      { name: "Gráfico de Barras", path: "/bar-chart" },
    ],
  },
  {
    icon: <Boxes />,
    name: "Elementos UI",
    subItems: [
      { name: "Alertas", path: "/alerts" },
      { name: "Avatar", path: "/avatars" },
      { name: "Insignia", path: "/badge" },
      { name: "Botones", path: "/buttons" },
      { name: "Imágenes", path: "/images" },
      { name: "Videos", path: "/videos" },
    ],
  },
  {
    icon: <LogIn />,
    name: "Autenticación",
    subItems: [
      { name: "Iniciar Sesión", path: "/signin" },
      { name: "Registro", path: "/signup" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const pathname = usePathname();

  const isActive = (path: string) => path === pathname;

  const renderMenuItems = (items: NavItem[]) => (
    <SidebarMenu>
      {items.map((nav) =>
        nav.subItems ? (
          <Collapsible
            key={nav.name}
            render={<SidebarMenuItem />}
            defaultOpen={nav.subItems.some((s) => isActive(s.path))}
            className="group/collapsible"
          >
            <CollapsibleTrigger
              render={<SidebarMenuButton tooltip={nav.name} />}
            >
              {nav.icon}
              <span>{nav.name}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {nav.subItems.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.name}>
                    <SidebarMenuSubButton
                      render={<Link href={subItem.path} />}
                      isActive={isActive(subItem.path)}
                    >
                      <span>{subItem.name}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ) : (
          nav.path && (
            <SidebarMenuItem key={nav.name}>
              <SidebarMenuButton
                render={<Link href={nav.path} />}
                isActive={isActive(nav.path)}
                tooltip={nav.name}
              >
                {nav.icon}
                <span>{nav.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )
      )}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" />}
              tooltip="Universidad Estatal de Bolívar"
            >
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg bg-white p-0.5">
                <Image
                  width={32}
                  height={32}
                  src="/images/logo/logo.png"
                  alt="UEB"
                  className="size-full object-contain"
                />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-semibold">UEB</span>
                <span className="truncate text-xs">
                  Universidad Estatal de Bolívar
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(navItems)}</SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Otros</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(othersItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              render={<Link href="/profile" />}
              tooltip="Soporte"
            >
              <LifeBuoy />
              <span>Soporte</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="sm"
              render={<Link href="/signin" />}
              tooltip="Cerrar sesión"
            >
              <LogOut />
              <span>Cerrar sesión</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;