import Image from "next/image";
import Scissors from "@/assets/scissors.svg";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <div className="flex flex-row gap-2">
        <Image src={Scissors} alt="tesoura de barbearia" />
        <span className="font-alt text-xl">Barber Shop</span>
      </div>
    </Link>
  );
}
