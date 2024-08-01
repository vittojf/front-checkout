import StripePayment from "@/components/FormPasarela";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <>
      <header className="w-full text-center py-8 justify-center  items-center mb-[10px] 2xl:mb-[200px]">
     
      </header>
      <main className="h-auto ">
        <StripePayment></StripePayment>
      </main>
    </>
  );
}
