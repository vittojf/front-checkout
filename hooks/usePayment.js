import axios from "axios";
import { useState } from "react";

export function usePayment() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageResult, setMessageResult] = useState("");

  const [bill] = useState({
    products: [{ name: "BayernVsArsenal", id: "xx", price: 50 }],
  });

  const formatExpDate = (value) => {
    const cleanedValue = value.replace(/\D/g, "");

    if (!cleanedValue) {
      return "";
    }

    let month = cleanedValue.slice(0, 2);
    let year = cleanedValue.slice(2, 4);

    if (month.length === 2) {
      let monthNum = parseInt(month, 10);
      if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return "";
      }
    }

    let formattedValue = month;
    if (year.length > 0) {
      formattedValue += `/${year}`;
    }

    return formattedValue.slice(0, 5);
  };

  const saveData = async (dataForm) => {
    console.log(dataForm);
    console.log("Validation passed, processing payment...");
    setLoading(true);
    setMessage("");

    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const body = {
        payment_date: new Date(),
        payment_stripe_record: {},
        products: bill.products,
        location: {
          timeZone,
        },
      };
      const res = await axios.post("/api/checkout", JSON.stringify(body));

      if (res.data.isSuccess) {
        setSuccess(true);
        setLoading(false);
        setMessage("00001");
      } else {
        setSuccess(false);
        setLoading(false);
        setMessageResult(res.data.message);
        setMessage("00005");

        console.log("Payment  Error");
      }
    } catch (error) {
      console.log(error);

      setSuccess(false);

      setLoading(false);

      setMessage("00005");
      setMessageResult("Error al procesar pago. Intentar de neuvo");
      console.log("Payment  Error");
    }
  };
  const saveDataError = async () => {


    console.log("Validation passed, processing payment...");

    setLoading(true);
    setMessage("");
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds
    setSuccess(true);

    setLoading(false);

    setMessage("00005");

    console.log("Payment processed successfully");
  };

  const restart = () => {

    setLoading(false);
    setSuccess(false);
    setMessage("");

    setMessageResult("");
  };

  return {
    bill,
    success,
    loading,
    message,
    messageResult,

    saveData,
    saveDataError,
    restart,
    formatExpDate,
  };
}
