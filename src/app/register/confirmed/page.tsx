import { AccountConfirmed } from "@/components/account-confirmed";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Conta criada",
  description: "Conta criada com sucesso.",
};

export default function AccountConfirmedPage() {
  return <AccountConfirmed />;
}
