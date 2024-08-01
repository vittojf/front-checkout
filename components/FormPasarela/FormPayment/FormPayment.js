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
import axios from "axios";
import React, { useEffect } from "react";

export const FormPayment = ({ setLoading, setSuccess, setMessage,setResult,result }) => {
  const {
    dataPaymentForm,
    handleOnChange,
    handleExpDateChange,
    handleCVCChange,
    errors,
    saveData,
    loading,
    success,
    saveDataError,
    bill
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
    <section className="m-auto order-2 2xl:order-1">
      
      <Card className="max-w-[700px] h-full">
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
        {result!==''&&<Card className=" border border-dashed text-center rounded-lg mb-10    " shadow="none">
        <p>{result}</p>
        <p>Intentar nuevamente</p>
        </Card>}
          <Button
            variant="bordered"
            onPress={() => {
              console.log("Button clicked");
              // test();
              saveData(setSuccess, setLoading, setMessage,setResult);
            }}
            className="w-full"
            size="lg"
          >
            Pago Exitoso
          </Button>
          <Button
            onPress={() => {
              console.log("Button clicked");
              // test();
              saveDataError(setSuccess, setLoading, setMessage,setResult);
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
