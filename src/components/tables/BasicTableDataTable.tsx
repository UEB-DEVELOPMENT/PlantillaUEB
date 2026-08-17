"use client";

import React from "react";
import DataTable from "@/components/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@ueb-development/ui/components/badge";
import Image from "next/image";

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
}

const tableData: Order[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
        "/images/user/user-24.jpg",
      ],
    },
    budget: "3.9K",
    status: "Activo",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Technology",
    team: {
      images: ["/images/user/user-25.jpg", "/images/user/user-26.jpg"],
    },
    budget: "24.9K",
    status: "Pendiente",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Zain Geidt",
      role: "Content Writing",
    },
    projectName: "Blog Writing",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Activo",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "2.8K",
    status: "Cancelado",
  },
  {
    id: 5,
    user: {
      image: "/images/user/user-21.jpg",
      name: "Carla George",
      role: "Front-end Developer",
    },
    projectName: "Website",
    team: {
      images: [
        "/images/user/user-31.jpg",
        "/images/user/user-32.jpg",
        "/images/user/user-33.jpg",
      ],
    },
    budget: "4.5K",
    status: "Activo",
  },
];

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "user",
    header: "Usuario",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full">
          <Image
            width={40}
            height={40}
            src={row.original.user.image}
            alt={row.original.user.name}
          />
        </div>
        <div>
          <span className="block font-medium text-foreground">
            {row.original.user.name}
          </span>
          <span className="block text-xs text-muted-foreground">
            {row.original.user.role}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "projectName",
    header: "Nombre del Proyecto",
  },
  {
    accessorKey: "team",
    header: "Equipo",
    cell: ({ row }) => (
      <div className="flex -space-x-2">
        {row.original.team.images.map((teamImage, index) => (
          <div
            key={index}
            className="h-6 w-6 overflow-hidden rounded-full border-2 border-white dark:border-gray-900"
          >
            <Image
              width={24}
              height={24}
              src={teamImage}
              alt={`Miembro del equipo ${index + 1}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      const variant =
        row.original.status === "Activo"
          ? "success"
          : row.original.status === "Pendiente"
          ? "warning"
          : "destructive";
      return <Badge variant={variant}>{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "budget",
    header: "Presupuesto",
  },
];

export default function BasicTableDataTable() {
  return (
    <DataTable
      data={tableData}
      columns={columns}
      keyExtractor={(order) => order.id}
      entityName="proyectos"
      searchPlaceholder="Buscar proyectos..."
    />
  );
}