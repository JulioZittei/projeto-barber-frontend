import { ConfirmRegistration } from "@/components/confirm-registration";
import { ForgotPassword } from "@/components/forgot-password";
import { SignUp } from "@/components/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Recuperar Senha",
  description:
    "Informe o e-mail vinculado à sua conta e iremos enviar um link para redefinição de senha.",
};

export default function RegisterPage() {
  return <ForgotPassword />;
}
