import axios from "axios";
import { useState } from "react";

export function usePayment() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [dataPaymentForm, setDataPaymentForm] = useState({
    name: "",
    cardNumber: "",
    expDate: "",
    cvc: "",
  });
  const [bill] = useState({
    products: [{ name: "PARTIDO VENEZUELA VS COLOMBIA ", id:"vzlavscol",price: 50 }],
  });


  




  const handleOnChange = (value, key) => {
    if (key === "cardNumber") {
      value = value.replace(/\D/g, ""); // Remove non-digit characters
    }
    setDataPaymentForm((e) => ({
      ...e,
      [key]: value,
    }));
    setErrors((e) => ({
      ...e,
      [key]: '',
    }));
  };

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

  const handleExpDateChange = (e) => {
    const formattedValue = formatExpDate(e.target.value);
    handleOnChange(formattedValue, "expDate");
  };

  const handleCVCChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    handleOnChange(value, "cvc");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!dataPaymentForm.name) newErrors.name = "Nombre es requerido";
    if (!dataPaymentForm.cardNumber) newErrors.cardNumber = "Número de tarjeta es requerido";
    if (dataPaymentForm.cardNumber.length < 16) newErrors.cardNumber = "Número de tarjeta debe tener 16 dígitos";
    if (!dataPaymentForm.expDate) newErrors.expDate = "Fecha de vencimiento es requerida";
    if (!dataPaymentForm.cvc) newErrors.cvc = "CVC es requerido";
    if (dataPaymentForm.cvc.length < 3) newErrors.cvc = "CVC debe tener 3 dígitos";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveData = async (updateSuccess,updateLoading,updateMessage) => {
    if (!validateForm()) {
      console.log("Validation failed", errors);
      return;
    }

    console.log("Validation passed, processing payment...");
    updateLoading(true)
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds

axios.post('http://localhost:50001/api/payment/success',{})
    
    setSuccess(true);
    updateSuccess(true)
    updateLoading(false)
    setLoading(false);

    setMessage('00001');
    updateMessage('00001')
    console.log("Payment processed successfully");
  };
  const saveDataError = async (updateSuccess,updateLoading,updateMessage) => {
    if (!validateForm()) {
      console.log("Validation failed", errors);
      return;
    }

    console.log("Validation passed, processing payment...");
    updateLoading(true)
    setLoading(true);
    setMessage('');
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay of 2 seconds
    setSuccess(true);
    updateSuccess(true)
    updateLoading(false)
    setLoading(false);

    setMessage('00005');
    updateMessage('00005')
    console.log("Payment processed successfully");
  };


  const restart=(updateSuccess,updateLoading,updateMessage)=>{
    updateMessage('')
    updateSuccess(false)
    updateLoading(false)
    setLoading(false);
    setSuccess(true);

  }

  return {
    dataPaymentForm,
    handleOnChange,
    handleExpDateChange,
    handleCVCChange,
    bill,
    success,
    loading,
    message,
    errors,
    saveData,
    saveDataError,
    restart
  };
}
