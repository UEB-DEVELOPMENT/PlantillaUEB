import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableDataTable from "@/components/tables/BasicTableDataTable";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Tabla Básica | UEB - Dashboard",
  description:
    "Página de tabla básica para el dashboard de la Universidad Estatal de Bolívar",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Tabla Básica" />
      <div className="space-y-6">
        <ComponentCard title="Tabla Básica">
          <BasicTableDataTable />
        </ComponentCard>
      </div>
    </div>
  );
}
