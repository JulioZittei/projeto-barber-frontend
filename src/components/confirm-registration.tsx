"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { Form } from "./ui/form";
import { ResendTimedButton } from "@/components/resend-timed-button";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useRegister } from "@/context/use-register";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

type Props = {};

type Field = "number0" | "number1" | "number2" | "number3";

const formSchema = z.object({
  number0: z.string().nonempty(),
  number1: z.string().nonempty(),
  number2: z.string().nonempty(),
  number3: z.string().nonempty(),
});

export function ConfirmRegistration({}: Props) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { toast } = useToast();
  const { code, email, nextStep, previousStep } = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number0: code[0],
      number1: code[1],
      number2: code[2],
      number3: code[3],
    },
  });

  const focusNextInput = (currentField: Field, nextField: Field) => {
    const nextFieldIndex = Object.keys(form.getValues()).findIndex(
      (value) => value === nextField,
    );

    if (nextField) {
      const nextInput = inputRefs.current[nextFieldIndex];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const focusPreviousInput = (currentField: Field, previousField: Field) => {
    const previousFieldIndex = Object.keys(form.getValues()).findIndex(
      (value) => value === previousField,
    );

    if (previousField) {
      const previousInput = inputRefs.current[previousFieldIndex];
      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    currentField: Field,
    nextField: Field,
  ) => {
    const value = event.target.value;
    const regex = /\d/g;

    if (regex.test(value)) {
      if (value) {
        form.setValue(currentField, value, {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        });
        focusNextInput(currentField, nextField);
      }
    } else {
      form.setValue(currentField, "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    currentField: Field,
    previousField: Field,
  ) => {
    if (event.key === "Backspace" || event.key === "Delete") {
      if (form.getValues()[currentField] === "") {
        event.preventDefault();
        focusPreviousInput(currentField, previousField);
      }
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text/plain");

    const regex = /^\d{4}$/;
    if (regex.test(pastedData)) {
      const fields = Object.keys(form.getValues()) as Field[];
      const pastedChars = pastedData.split("");
      pastedChars.forEach((char, index) => {
        if (fields[index]) {
          form.setValue(fields[index], char);
        }
      });
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/auth/resend-code", {
        email,
      });
      form.reset();
      toast({
        variant: "success",
        title: "Código reenviado!",
        description: "Verifique novamente sua caixa de entrada ou spam.",
      });
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        toast({
          variant: "destructive",
          title: "Ops! Deu ruim",
          description: err.response?.data.message.Erro,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ops! Deu ruim",
          description:
            "Ocorreu um erro durante o reenvio do código de verificação.",
        });
      }
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const code = Object.values(values).join("");

    try {
      await api.post("/auth/confirm", {
        email,
        code,
      });
      nextStep();
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data?.message?.Erro) {
        toast({
          variant: "destructive",
          title: "Ops! Deu ruim",
          description: err.response?.data.message.Erro,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ops! De ruim",
          description: "Código informado inválido ou expirado.",
        });
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <Card className="rounded-b-none rounded-t-3xl">
        <CardHeader className="items-center text-center">
          <CardTitle>Verificação de Segurança</CardTitle>
          <CardDescription className="text-center">
            Insira o código de verificação enviado para o e-mail:{" "}
            <strong>{email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="POST">
              <div className="mt-3 flex flex-col">
                <div className="mx-auto mb-9 flex w-full max-w-xs flex-row items-center justify-between">
                  {Object.keys(form.getValues()).map((value, index) => (
                    <div className="h-16 w-16 " key={index}>
                      <Input
                        type="text"
                        inputMode="numeric"
                        className={cn(
                          "flex h-full w-full flex-col items-center justify-center rounded-xl px-5 text-center text-lg ",
                          form.formState.errors[value as Field] &&
                            "border border-solid border-destructive",
                        )}
                        maxLength={1}
                        value={form.watch(value as Field)}
                        onChange={(event) =>
                          handleInputChange(
                            event,
                            value as Field,
                            Object.keys(form.getValues())[index + 1] as Field,
                          )
                        }
                        onKeyDown={(event) =>
                          handleKeyDown(
                            event,
                            value as Field,
                            Object.keys(form.getValues())[index - 1] as Field,
                          )
                        }
                        onPaste={handlePaste}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  <div>
                    <Button
                      className="w-full bg-orange hover:bg-orange hover:brightness-95"
                      size="lg"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Verificar
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col justify-center">
          <Button variant="link" onClick={previousStep}>
            Alterar e-mail
          </Button>
          <p className="text-center text-muted-foreground">
            Não recebeu o código?{" "}
            <ResendTimedButton startAtSeconds={60} onResend={handleResend} />
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
