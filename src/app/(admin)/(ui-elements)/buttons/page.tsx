import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { BoxIcon } from "@/icons";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Botones | UEB - Dashboard",
  description:
    "Página de botones para el dashboard de la Universidad Estatal de Bolívar",
};

export default function Buttons() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Botones" />
      <div className="space-y-5 sm:space-y-6">
        {/* Primary Button */}
        <ComponentCard title="Botón Primario">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary">
              Texto del Botón
            </Button>
            <Button size="md" variant="primary">
              Texto del Botón
            </Button>
          </div>
        </ComponentCard>
        {/* Primary Button with Start Icon */}
        <ComponentCard title="Botón Primario con Icono Izquierdo">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" startIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
            <Button size="md" variant="primary" startIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
          </div>
        </ComponentCard>{" "}
        {/* Primary Button with Start Icon */}
        <ComponentCard title="Botón Primario con Icono Derecho">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="primary" endIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
            <Button size="md" variant="primary" endIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button */}
        <ComponentCard title="Botón Secundario">
          <div className="flex items-center gap-5">
            {/* Outline Button */}
            <Button size="sm" variant="outline">
              Texto del Botón
            </Button>
            <Button size="md" variant="outline">
              Texto del Botón
            </Button>
          </div>
        </ComponentCard>
        {/* Outline Button with Start Icon */}
        <ComponentCard title="Botón de Contorno con Icono Izquierdo">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" startIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
            <Button size="md" variant="outline" startIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
          </div>
        </ComponentCard>{" "}
        {/* Outline Button with Start Icon */}
        <ComponentCard title="Botón de Contorno con Icono Derecho">
          <div className="flex items-center gap-5">
            <Button size="sm" variant="outline" endIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
            <Button size="md" variant="outline" endIcon={<BoxIcon />}>
              Texto del Botón
            </Button>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}
