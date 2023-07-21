import { Logo } from "@/components/logo";
import "./globals.css";
import type { Metadata } from "next";
import {
  Roboto_Flex as Roboto,
  Black_Ops_One as BlackOps,
} from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const blackOps = BlackOps({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-black-ops",
});

export const metadata: Metadata = {
  title: "Barber Shop",
  description: "Bem-vindo ao mundo da autêntica masculinidade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, height=device-height, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={cn(
          roboto.variable,
          blackOps.variable,
          "min-h-[100dvh] bg-black/90 bg-cover bg-center font-sans text-gray-100",
        )}
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9)), url(../home_bg.jpeg)",
        }}
      >
        <div className="flex min-h-[100dvh] flex-col items-center">
          <header className="w-full flex-row items-center justify-start p-6">
            <Logo />
          </header>
          <main className="flex h-full w-full flex-1 items-end">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
