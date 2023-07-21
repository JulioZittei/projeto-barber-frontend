import { SignUp } from "@/components/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Cadastre-se",
  description: "Cadastre-se para criar uma nova conta.",
};

export default function RegisterPage() {
  return <SignUp />;
}
