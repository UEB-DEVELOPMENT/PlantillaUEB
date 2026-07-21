import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | UEB - Dashboard",
  description: "Página de registro de la Universidad Estatal de Bolívar",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
