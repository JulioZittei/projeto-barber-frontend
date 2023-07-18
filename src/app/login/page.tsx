import { Login } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Login",
  description: "Faça login para acessar sua conta.",
};

export default function RegisterPage() {
  return (
    <main className="h-full w-full flex-1">
      <Login />
    </main>
  );
}
