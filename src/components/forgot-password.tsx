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
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { api } from "@/lib/api";
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
});

export function ForgotPassword({}: Props) {
  const { toast } = useToast();

  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/auth/forgot-password", {
        email: values.email,
      });

      form.reset();

      toast({
        variant: "success",
        title: "E-mail enviado",
        description:
          "Enviamos um link de redefinição de senha para seu e-mail.",
      });
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
          title: "Ops! Deu ruim",
          description: "Ocorreu um erro no seu pedido de recuperação de senha.",
        });
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-end">
      <Card className="rounded-b-none rounded-t-3xl">
        <CardHeader>
          <CardTitle>Recuperar Senha</CardTitle>
          <CardDescription>
            Insira abaixo o e-mail vinculado à sua conta e iremos enviar um link
            para redefinição de senha.
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

              <Button
                className="w-full bg-orange hover:bg-orange hover:brightness-95"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enviar
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
