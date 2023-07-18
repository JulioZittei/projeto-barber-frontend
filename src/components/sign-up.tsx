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

type Props = {};

const formSchema = z
  .object({
    email: z.string().email({
      message: "Email inválido",
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordMatch: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    form.reset();
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu email" {...field} />
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
                      <Input
                        type="password"
                        placeholder="Sua senha"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Confirme sua senha"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full bg-orange hover:bg-orange hover:brightness-95">
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
