import LineChartOne from "@/components/charts/line/LineChartOne";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gráfico de Líneas | UEB - Dashboard",
  description:
    "Página de gráfico de líneas para el dashboard de la Universidad Estatal de Bolívar",
};
export default function LineChart() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Gráfico de Líneas" />
      <div className="space-y-6">
        <ComponentCard title="Gráfico de Líneas 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </div>
  );
}
