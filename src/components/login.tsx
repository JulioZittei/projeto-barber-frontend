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

type Props = {};

const formSchema = z.object({
  email: z.string().nonempty({
    message: "Email é obrigatório",
  }),
  password: z.string().nonempty({
    message: "Senha é obrigatória",
  }),
});

export function Login({}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      console.log("wait 5 seconds");
      form.reset();
      setIsLoading(false);
    }, 5000);
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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          className="pr-12"
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
                    <FormMessage />
                    <FormDescription>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-sm leading-none text-muted-foreground underline"
                        asChild
                      >
                        <Link href="/forgot-password">Esqueceu sua senha?</Link>
                      </Button>
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                className="w-full bg-orange hover:bg-orange hover:brightness-95"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
