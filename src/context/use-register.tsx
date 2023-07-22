"use client";
import { ReactNode, createContext, useContext, useState } from "react";

type SignInInfo = {
  email: string;
  password: string;
  passwordMatch: string;
};

type RegisterProviderProps = {
  children: ReactNode;
};

type RegisterContextData = {
  nextStep: () => void;
  previousStep: () => void;
  setSignInInfo: (value: SignInInfo) => void;
  clearContext: () => void;
  step: number;
  email: string;
  password: string;
  passwordMatch: string;
  code: string;
};

export const RegisterContext = createContext({} as RegisterContextData);

export default function RegisterProvider({ children }: RegisterProviderProps) {
  const MAX_STEPS = 2;
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [code, setCode] = useState("");

  function setSignInInfo({ email, password, passwordMatch }: SignInInfo) {
    setEmail(email);
    setPassword(password);
    setPasswordMatch(passwordMatch);
  }

  function nextStep() {
    if (step + 1 <= MAX_STEPS) {
      setStep(step + 1);
    }
  }

  function previousStep() {
    if (step - 1 >= 0) {
      setStep(step - 1);
    }
  }

  function clearContext() {
    setStep(0);
    setEmail("");
    setPassword("");
    setPasswordMatch("");
    setCode("");
  }

  return (
    <RegisterContext.Provider
      value={{
        nextStep,
        previousStep,
        setSignInInfo,
        clearContext,
        step,
        email,
        password,
        passwordMatch,
        code,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  return useContext(RegisterContext);
}
