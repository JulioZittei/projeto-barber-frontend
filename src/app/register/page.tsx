import { SignUp } from "@/components/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Cadastre-se",
  description: "Cadastre-se para criar uma nova conta.",
};

export default function RegisterPage() {
  return (
    <main className="h-full w-full flex-1">
      <SignUp />
    </main>
  );
}
