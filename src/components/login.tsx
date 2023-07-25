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
import { FormEvent, useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { AxiosError } from "axios";

type Props = {};

const formSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  password: z.string().nonempty({
    message: "Senha é obrigatória",
  }),
});

export function Login({}: Props) {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleToggleShowPassword(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      form.reset();
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
          description: "Ocorreu um erro durante a tentativa de login.",
        });
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <Card className="rounded-b-none rounded-t-3xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Entre com sua conta ou crie uma nova
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} action="POST">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
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
                  <FormItem>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          {...field}
                          className={cn(
                            form.formState.errors[field.name] &&
                              "border border-solid border-destructive",
                            "pr-12",
                          )}
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
                    <FormMessage />
                    <FormDescription>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm leading-none text-muted-foreground underline"
                        asChild
                      >
                        <Link href="/auth/forgot-password">
                          Esqueceu sua senha?
                        </Link>
                      </Button>
                    </FormDescription>
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
                Entrar
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/register">Criar conta</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
