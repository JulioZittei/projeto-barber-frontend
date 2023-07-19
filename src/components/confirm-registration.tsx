"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {};

type Field = "number0" | "number1" | "number2" | "number3";

const formSchema = z.object({
  number0: z.string().nonempty(),
  number1: z.string().nonempty(),
  number2: z.string().nonempty(),
  number3: z.string().nonempty(),
});

export function ConfirmRegistration({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      number0: "",
      number1: "",
      number2: "",
      number3: "",
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

  function onSubmit(values: z.infer<typeof formSchema>): void {
    setIsLoading(true);
    setTimeout(() => {
      console.log(values);
      console.log(Object.values(values).join(""));
      form.reset();
      setIsLoading(false);
    }, 5000);
  }

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <Card className="rounded-b-none rounded-t-3xl">
        <CardHeader className="items-center">
          <CardTitle>Verificação de Segurança</CardTitle>
          <CardDescription className="text-center">
            Enviamos um código para seu email <strong>jul**@gmail.com</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mt-3 flex flex-col">
                <div className="mx-auto mb-9 flex w-full max-w-xs flex-row items-center justify-between">
                  {Object.keys(form.getValues()).map((value, index) => (
                    <div className="h-16 w-16 " key={index}>
                      <Input
                        type="text"
                        inputMode="numeric"
                        className={cn(
                          "flex h-full w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white px-5 text-center text-lg outline-none  focus:bg-gray-50 focus:ring-1 focus-visible:border-gray-200",
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
                      disabled={isLoading}
                    >
                      {isLoading && (
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
        <CardFooter className="justify-center">
          <p className="text-center text-muted-foreground">
            Não recebeu o código?{" "}
            <Button variant="link" className="p-0" asChild>
              <Link href="/register">Reenviar</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
