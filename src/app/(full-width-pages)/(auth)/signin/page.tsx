import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | UEB - Dashboard",
  description: "Página de inicio de sesión de la Universidad Estatal de Bolívar",
};

export default function SignIn() {
  return <SignInForm />;
}
