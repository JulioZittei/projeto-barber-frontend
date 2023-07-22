import { ChangePassword } from "@/components/change-password";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Cadastrar Nova Senha",
  description: "Informe e confirme uma nova senha",
};

export default function ChangePasswordPage() {
  return <ChangePassword />;
}
