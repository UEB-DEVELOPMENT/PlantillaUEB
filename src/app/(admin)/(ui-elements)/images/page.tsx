import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ResponsiveImage from "@/components/ui/images/ResponsiveImage";
import ThreeColumnImageGrid from "@/components/ui/images/ThreeColumnImageGrid";
import TwoColumnImageGrid from "@/components/ui/images/TwoColumnImageGrid";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Imágenes | UEB - Dashboard",
  description:
    "Página de imágenes para el dashboard de la Universidad Estatal de Bolívar",
  // other metadata
};

export default function Images() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Imágenes" />
      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Imagen Responsiva">
          <ResponsiveImage />
        </ComponentCard>
        <ComponentCard title="Imagen en Cuadrícula de 2">
          <TwoColumnImageGrid />
        </ComponentCard>
        <ComponentCard title="Imagen en Cuadrícula de 3">
          <ThreeColumnImageGrid />
        </ComponentCard>
      </div>
    </div>
  );
}
