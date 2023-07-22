import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

export function Welcome({}: Props) {
  return (
    <div className="flex h-full w-full flex-col justify-end gap-6">
      <div className="flex flex-col justify-end">
        <div>
          <h1 className="text-lg text-gray-100">
            Bem-vindo ao
            <br />
            <span className="text-3xl font-bold">
              Mundo da autêntica masculinidade.
            </span>
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6">
        <Button
          className="flex-1 bg-orange hover:bg-orange hover:brightness-95"
          asChild
        >
          <Link href="/auth/login">Fazer login</Link>
        </Button>
        <Button
          className="flex-1 bg-gray-300/10 bg-clip-padding backdrop-blur-sm backdrop-filter hover:bg-gray-300/10 hover:brightness-95"
          asChild
        >
          <Link href="/register">Criar conta</Link>
        </Button>
      </div>
    </div>
  );
}
