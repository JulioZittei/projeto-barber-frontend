import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import Done from "@/assets/done.png";
import Link from "next/link";

type Props = {};

export function AccountConfirmed({}: Props) {
  return (
    <div className="w-full flex-1">
      <Card className="flex w-full flex-1 justify-center rounded-b-none rounded-t-3xl ">
        <CardContent className="flex flex-1 flex-col items-center justify-center p-6">
          <Image src={Done} alt="Pronto" className="mb-8" />

          <CardTitle className="mb-4">Pronto!</CardTitle>
          <CardDescription className="mb-8">
            Sua conta foi criada com sucesso.
          </CardDescription>

          <Button
            className="w-full bg-orange hover:bg-orange hover:brightness-95"
            asChild
          >
            <Link href="/login">Fazer login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
