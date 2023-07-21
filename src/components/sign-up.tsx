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
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Loader2 } from "lucide-react";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

const formSchema = z
  .object({
    email: z
      .string()
      .nonempty({
        message: "E-mail é obrigatório",
      })
      .email({
        message: "E-mail inválido",
      }),
    password: z
      .string()
      .min(8, {
        message: "Mínimo de 8 caracteres",
      })
      .max(24, {
        message: "Máximo de 24 caracteres",
      }),
    passwordMatch: z
      .string()
      .min(8, {
        message: "Mínimo de 8 caracteres",
      })
      .max(24, {
        message: "Máximo de 24 caracteres",
      }),
  })
  .refine(({ password, passwordMatch }) => password === passwordMatch, {
    message: "Senhas não correspodem",
    path: ["passwordMatch"],
  });

export function SignUp({}: Props) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleToggleShowPassword(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordMatch: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
    router.push("/register/confirm");
  }

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <Card className="rounded-b-none rounded-t-3xl">
        <CardHeader>
          <CardTitle>Cadastre-se</CardTitle>
          <CardDescription>
            Informe os dados abaixo para criar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>E-email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu e-mail"
                        {...field}
                        className={cn(
                          form.formState.errors[field.name] &&
                            "border border-solid border-destructive",
                        )}
                      />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Crie uma senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          className={cn(
                            form.formState.errors[field.name] &&
                              "border border-solid border-destructive",
                            "pr-12",
                          )}
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          {...field}
                        />
                        <button
                          tabIndex={-1}
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground"
                          onClick={handleToggleShowPassword}
                        >
                          {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                        </button>
                      </div>
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordMatch"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="passwordMatch"
                          className={cn(
                            form.formState.errors[field.name] &&
                              "border border-solid border-destructive",
                            "pr-12",
                          )}
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirme sua senha"
                          {...field}
                        />
                        <button
                          tabIndex={-1}
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground"
                          onClick={handleToggleShowPassword}
                        >
                          {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                        </button>
                      </div>
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-orange hover:bg-orange hover:brightness-95"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Criar conta
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/login">Fazer login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
