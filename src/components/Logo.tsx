import Image from "next/image";
import Scissors from "@/assets/scissors.svg";

export function Logo() {
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <Image src={Scissors} alt="tesoura de barbearia" />{" "}
      <span className="font-alt text-xl">Barber Shop</span>
    </div>
  );
}
