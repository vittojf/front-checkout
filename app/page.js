'use client'
import StripePayment from "@/components/FormPasarela";
import { usePayment } from "@/hooks/usePayment";


export default function Home() {
  const {

    saveData,
    loading,
    success,
    formatExpDate,
    messageResult,
    restart,
    message,
    bill,
    saveDataError
  } = usePayment();


  return (
    <>
      <header className="w-full text-center py-8 justify-center  items-center mb-[10px] 2xl:mb-[200px]"></header>
      <main className="h-auto ">
        <StripePayment
        restart={restart}
        saveDataError={saveDataError}
          loading={loading}
          success={success}
          message={message}
          result={messageResult}
          formatExpDate={formatExpDate}
          bill={bill}
          saveData={saveData}
        ></StripePayment>
      </main>
    </>
  );
}
