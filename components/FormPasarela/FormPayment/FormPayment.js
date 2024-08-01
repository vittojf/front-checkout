"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Button,
  Card,
  CardBody,
  
  CardHeader,
  Input,
} from "@nextui-org/react";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const FormPayment = ({ saveData, formatExpDate, result,saveDataError }) => {
  const [type, setType] = useState("valid");
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

  const handleChangeDate = (value) => {
    if (!value) return false;
    const formattedValue = formatExpDate(value);
    return (
      formattedValue &&
      formattedValue.length === 5 &&
      /^\d{2}\/\d{2}$/.test(formattedValue)
    );
  };

  const handleChangeName = (value) => {
    return /^[a-zA-Z\s]+$/.test(value);
  };

  const handleCVCChange = (value) => {
    return /^\d{3}$/.test(value);
  };

  const validateCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    return /^(\d{15,19})$/.test(cleanedValue);
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .required(`Nombre es requerido`)
      .test("valid-name", "Nombre no es valido", handleChangeName),

    cardNumber: yup
      .string()
      .required(`Número de tarjeta es requerido`)
      .test(
        "valid-card-number",
        "Número de tarjeta no válido",
        validateCardNumber
      ),
    expDate: yup
      .string()
      .required(`Fecha de vencimiento es requerida`)
      .test(
        "valid-exp-date",
        "Fecha de vencimiento no es válida",
        handleChangeDate
      ),
    cvc: yup
      .string()
      .required(`CVC es requerido`)
      .test("valid-cvc", "CVC no valido", handleCVCChange),
  });

  const handleOnClik = (data) => {
    if(type==="valid")saveData(data);
    if(type==="error")saveDataError(data)
  };

  const {
    trigger,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      cardNumber: "",
      expDate: "",
      cvc: "",
    },
  });

  const handleFieldChange = async (event, field) => {
    const value = event.target.value;
    let filteredValue = value;
    if (field.name === "cvc") {
      filteredValue = value.replace(/\D/g, "").slice(0, 3);
    } else if (field.name === "name") {
      filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    } else if (field.name === "cardNumber") {
      filteredValue = value.replace(/\D/g, "").slice(0, 19);
    } else if (field.name === "expDate") {
      filteredValue = formatExpDate(value);
    }
    field.onChange(filteredValue);

    // Trigger validation only if there's an error
    if (errors[field.name]) {
      await trigger(field.name);
    }
  };

  return (
    <section className="m-auto order-2 2xl:order-1">
      <Card className="max-w-[700px] h-full">
        <CardHeader>Pay card</CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit(handleOnClik)}
            className="flex flex-wrap flex-row gap-4"
          >
            {itemsForm
              .filter((x) => x.row === false)
              .map((i, key) => {
                return (
                  <React.Fragment key={key}>
                    <Controller
                      name={i.field}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          onChange={(event) => handleFieldChange(event, field)}
                          label={i.name}
                          className={i.row ? "w-[40%]" : "w-full"}
                          variant="bordered"
                          isInvalid={!!errors[i.field]}
                          errorMessage={errors[i.field]?.message}
                          onBlur={() => trigger(i.field)}
                        />
                      )}
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
                      <Controller
                        name={i.field}
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label={i.name}
                            variant="bordered"
                            isInvalid={!!errors[i.field]}
                            errorMessage={errors[i.field]?.message}
                            className="w-full"
                            onChange={(event) =>
                              handleFieldChange(event, field)
                            }
                            onBlur={() => trigger(i.field)}
                          />
                        )}
                      />
                    </React.Fragment>
                  );
                })}
            </div>
       
            {result !== "" && (
              <Card
                className=" border border-dashed text-center rounded-lg mb-10  w-full "
                shadow="none"
              >
                <p>{result}</p>
                <p>Intentar nuevamente</p>
              </Card>
            )}
            <Button
              variant="bordered"
              type="submit"
              onPress={() => {
                setType("valid");
              }}
              // onPress={() => {
              //   console.log("Button clicked");
              //   // test();
              //   saveData(setSuccess, setLoading, setMessage, setResult);
              // }}
              className="w-full"
              size="lg"
            >
              Pago Exitoso
            </Button>

            <Button
              type="submit"
              onPress={() => {
                setType("error");
              }}
              className="w-full"
              size="lg"
            >
              Pago cancelado
            </Button>
          </form>
       
        </CardBody>
      </Card>
    </section>
  );
};
