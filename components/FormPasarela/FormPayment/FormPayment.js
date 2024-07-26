"use client";
import { usePayment } from "@/hooks/usePayment";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import React, { useEffect } from "react";

export const FormPayment = ({ setLoading, setSuccess,setMessage }) => {
  const {
    dataPaymentForm,
    handleOnChange,
    handleExpDateChange,
    handleCVCChange,
    errors,
    saveData,
    loading,
    success,
    saveDataError
  } = usePayment();

  const itemsForm = [
    {
      name: "Nombre del titular de la tarjeta*",
      field: "name",
      type: "text",
      row: false,
    },
    {
      name: "Numero de la tarjeta*",
      field: "cardNumber",
      type: "text",
      row: false,
    },
    {
      name: "Fecha de vencimiento - (mm/yy)*",
      field: "expDate",
      type: "date",
      row: true,
    },
    { name: "CVC*", field: "cvc", type: "text", row: true },
  ];

  return (
    <section className="m-auto">
      <Card className="w-[700px] h-full">
        <CardHeader>Pay card</CardHeader>
        <CardBody className="flex flex-wrap flex-row gap-4">
          {itemsForm
            .filter((x) => x.row === false)
            .map((i, key) => {
              return (
                <React.Fragment key={key}>
                  <Input
                    label={i.name}
                    value={dataPaymentForm[i.field]}
                    className={i.row ? "w-[40%]" : "w-full"}
                    errorMessage={errors[i.field]}
                    isInvalid={
                      !Object.keys(errors).length
                        ? false
                        : errors[i.field] !== ""
                    }
                    onChange={
                      i.field === "expDate"
                        ? handleExpDateChange
                        : i.field === "cvc"
                        ? handleCVCChange
                        : (e) => handleOnChange(e.target.value, i.field)
                    }
                  />
                </React.Fragment>
              );
            })}
          <div className="w-full grid grid-cols-2 gap-5">
            {itemsForm
              .filter((x) => x.row === true)
              .map((i, key) => {
                return (
                  <React.Fragment key={key}>
                    <Input
                      label={i.name}
                      value={dataPaymentForm[i.field]}
                      className={"w-full"}
                      errorMessage={errors[i.field]}
                      isInvalid={
                        !Object.keys(errors).length
                          ? false
                          : errors[i.field] !== ""
                      }
                      onChange={
                        i.field === "expDate"
                          ? handleExpDateChange
                          : i.field === "cvc"
                          ? handleCVCChange
                          : (e) => handleOnChange(e.target.value, i.field)
                      }
                    />
                  </React.Fragment>
                );
              })}
          </div>
        </CardBody>
        <CardFooter className="grid grid-cols-1  gap-5">
          <Button
            variant="bordered"
            onPress={() => {
              console.log("Button clicked");
              saveData(setSuccess, setLoading,setMessage);
            }}
            className="w-full"
            size="lg"
          >
            Pago Exitoso
          </Button>
          <Button
            onPress={() => {
              console.log("Button clicked");
              saveDataError(setSuccess, setLoading,setMessage);
            }}
            className="w-full"
            size="lg"
          >
            Pago cancelado
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};
