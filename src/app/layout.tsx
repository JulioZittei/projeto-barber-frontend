import "./globals.css";
import type { Metadata } from "next";
import {
  Roboto_Flex as Roboto,
  Black_Ops_One as BlackOps,
} from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], variable: "--font-roboto" });
const blackOps = BlackOps({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-black-ops",
});

export const metadata: Metadata = {
  title: "Barber Shop App",
  description: "Bem-vindo ao mundo dos homens de verdade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head></head>
      <body className={`${roboto.variable} ${blackOps.variable}`}>
        {children}
      </body>
    </html>
  );
}
