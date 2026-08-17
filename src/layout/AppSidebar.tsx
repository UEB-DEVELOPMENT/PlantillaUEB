"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ueb-development/ui/components/collapsible";
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
} from "@ueb-development/ui/components/sidebar";
import {
  Boxes,
  CalendarDays,
  ChartLine,
  ChevronRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LogIn,
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
            asChild
            defaultOpen={nav.subItems.some((s) => isActive(s.path))}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={nav.name}>
                  {nav.icon}
                  <span>{nav.name}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {nav.subItems.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.name}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive(subItem.path)}
                      >
                        <Link href={subItem.path}>{subItem.name}</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          nav.path && (
            <SidebarMenuItem key={nav.name}>
              <SidebarMenuButton
                asChild
                isActive={isActive(nav.path)}
                tooltip={nav.name}
              >
                <Link href={nav.path}>
                  {nav.icon}
                  <span>{nav.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )
      )}
    </SidebarMenu>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link
          href="/"
          className="flex justify-center px-3 py-2 group-data-[collapsible=icon]:hidden"
        >
          <Image
            width={220}
            height={60}
            src="/images/logo/UEB.png"
            alt="UEB"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menú</SidebarGroupLabel>
          <SidebarGroupContent>{renderMenuItems(navItems)}</SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Otros</SidebarGroupLabel>
          <SidebarGroupContent>
            {renderMenuItems(othersItems)}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pointer-events-none overflow-hidden p-0">
        <img
          src="/images/shape/grid-01.svg"
          alt=""
          aria-hidden
          className="h-52 w-full -scale-y-100 object-cover"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;