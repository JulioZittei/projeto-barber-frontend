import { ConfirmRegistration } from "@/components/confirm-registration";
import { SignUp } from "@/components/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Confirmar Cadastro",
  description: "Confirme seu e-mail para validar a sua conta.",
};

export default function RegisterPage() {
  return (
    <main className="h-full w-full flex-1">
      <ConfirmRegistration />
    </main>
  );
}
