import GridShape from "@/components/common/GridShape";
import { Button } from "@ueb-development/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 bg-primary">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <div className="mb-8">
          <Image
            src="/images/logo/UEB.png"
            alt="UEB"
            width={200}
            height={70}
          />
        </div>

        <h1 className="mb-4 font-bold text-destructive text-4xl xl:text-7xl">
          404
        </h1>

        <p className="mb-6 text-base text-white/70 sm:text-lg">
          Página no encontrada
        </p>

        <Button asChild variant="destructive">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
      <p className="absolute text-sm text-center text-white/50 -translate-x-1/2 bottom-6 left-1/2">
        Copyright &copy; {new Date().getFullYear()} Derechos Reservados Universidad Estatal de Bolívar - Direcci&oacute;n de TICs
      </p>
    </div>
  );
}
