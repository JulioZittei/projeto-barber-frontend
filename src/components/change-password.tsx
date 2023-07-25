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
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

type Props = {};

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Mínimo de 8 caracteres",
      })
      .max(24, {
        message: "Máximo de 24 caracteres",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número",
      })
      .refine((value) => /[!@#$%^&*]/.test(value), {
        message:
          "A senha deve conter pelo menos um caractere especial (!@#$%^&*)",
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

export function ChangePassword({}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();

  function handleToggleShowPassword(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordMatch: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/auth/change-password", {
        token: params.get("token"),
        password: values.password,
      });
      form.reset();
      toast({
        variant: "success",
        title: "Senha alterada!",
        description: "Agora é só fazer o login com sua nova senha",
      });
      router.push("/auth/login");
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
          description: "Ocorreu um erro durante a alteração da senha.",
        });
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <Card className="rounded-b-none rounded-t-3xl">
        <CardHeader>
          <CardTitle>Criar Nova Senha</CardTitle>
          <CardDescription>Informe e confirme sua nova senha</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="POST">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel htmlFor="password">Crie uma senha</FormLabel>
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
                    <FormLabel htmlFor="password">Confirme sua senha</FormLabel>
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
                Salvar senha
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/auth/login">Fazer login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
