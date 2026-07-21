import BarChartOne from "@/components/charts/bar/BarChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gráfico de Barras | UEB - Dashboard",
  description:
    "Página de gráfico de barras para el dashboard de la Universidad Estatal de Bolívar",
};

export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Gráfico de Barras" />
      <div className="space-y-6">
        <ComponentCard title="Gráfico de Barras 1">
          <BarChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
