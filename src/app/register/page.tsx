import { MultiStepForm } from "@/components/multi-step-form";
import { SignUp } from "@/components/sign-up";
import RegisterProvider from "@/context/use-register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Barber Shop | Cadastre-se",
  description: "Cadastre-se para criar uma nova conta.",
};

export default function RegisterPage() {
  return (
    <RegisterProvider>
      {/* <SignUp /> */}
      <MultiStepForm />
    </RegisterProvider>
  );
}
