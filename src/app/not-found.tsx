import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1 bg-brand-500">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <div className="mb-8">
          <Image
            src="/images/logo/UEB.png"
            alt="UEB"
            width={200}
            height={70}
            className="mx-auto brightness-0 invert"
          />
        </div>

        <h1 className="mb-4 font-bold text-error-500 text-title-md xl:text-title-2xl">
          404
        </h1>

        <p className="mb-6 text-base text-white/70 sm:text-lg">
          Página no encontrada
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-error-500 px-5 py-3.5 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600"
        >
          Volver al inicio
        </Link>
      </div>
      <p className="absolute text-sm text-center text-white/50 -translate-x-1/2 bottom-6 left-1/2">
        Copyright &copy; {new Date().getFullYear()} Derechos Reservados Universidad Estatal de Bolívar - Direcci&oacute;n de TICs
      </p>
    </div>
  );
}
