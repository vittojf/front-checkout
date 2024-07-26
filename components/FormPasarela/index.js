"use client";
import React, { useState } from "react";

import { BillPayment } from "./Bill/BillPayment";
import { usePayment } from "@/hooks/usePayment";
import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FormPayment } from "./FormPayment/FormPayment";

export default function StripePayment() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const { bill,restart } = usePayment();

  return (
    <React.Fragment>
      <section>
        <AnimatePresence>
          {!loading && !success && (
            <motion.article
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full grid transition-all grid-cols-2 justify-center items-center px-28 h-full "
            >
              <FormPayment
                setLoading={setLoading}
                setMessage={setMessage}
                setSuccess={setSuccess}
              />
              <BillPayment bill={bill} />
            </motion.article>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {loading && (
            <motion.article
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center px-28 h-[800px]"
            >
              <Card className="w-[600px]">
                <CardHeader></CardHeader>
                <CardBody className="flex justify-center items-center">
                  <Spinner />
                  <h3 className="text-xl font-bold mt-10">Procesando...</h3>
                </CardBody>
              </Card>
            </motion.article>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {success && (
            <motion.article
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center px-28 h-[800px]"
            >
              <Card className="w-[600px]">
                <CardHeader></CardHeader>
                <CardBody className="flex justify-center items-center">
                  <Image
                    src={message === "00005" ? "/delete.png" : "/check.png"}
                    className="w-[150px]"
                    width={512}
                    height={512}
                  />

                  {message === "00001" ? (
                    <h3 className="text-xl font-bold mt-10">
                      {" "}
                      ¡Éxito en el pago!
                    </h3>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mt-10">
                        {" "}
                        Error al procesar. 
                      </h3>
                      <p>CODIGO {message} FONDO INSUFICIENTE</p>
                      <Button onPress={()=>restart(setSuccess,setLoading,setMessage)}>Reintentar</Button>
                    </>
                  )}
                </CardBody>
              </Card>
            </motion.article>
          )}
        </AnimatePresence>
      </section>
    </React.Fragment>
  );
}
