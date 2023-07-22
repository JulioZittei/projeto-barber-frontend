"use client";

import { useRegister } from "@/context/use-register";
import { SignUp } from "./sign-up";
import { ConfirmRegistration } from "./confirm-registration";
import { AccountConfirmed } from "./account-confirmed";

type Props = {};

export function MultiStepForm({}: Props) {
  const { step } = useRegister();

  return (
    <>
      {step === 0 && <SignUp />}
      {step === 1 && <ConfirmRegistration />}
      {step === 2 && <AccountConfirmed />}
    </>
  );
}
