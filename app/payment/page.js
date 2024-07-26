import StripePayment from "@/components/FormPasarela";

export default function PaymentPage() {
  return (
    <>
      <header className="w-full text-center py-8 justify-center text-white items-center mb-[200px]">
        <h3>Logo</h3>
      </header>
      <main className=" ">
        <StripePayment></StripePayment>
      </main>
    </>
  );
}
