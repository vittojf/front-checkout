import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

export const BillPayment = ({ bill }) => {
  return (
    <Card shadow="none" className="border border-dashed m-auto  h-auto w-full lg:w-[500px] max-w-[500px] order-1 2xl:order-2">
      <CardHeader>
        <h2>Bill</h2>
      </CardHeader>
      <CardBody className="px-12 flex flex-col gap-10">
        {bill.products.map((x, key) => {
          return (
            <div key={key} className="flex justify-between flex-row w-full">
              <p className=" text-sm font-medium">{x.name}</p>
              <p className="text-base font-bold">${x.price} </p>
            </div>
          );
        })}

        <Divider></Divider>
        <div className="flex justify-between flex-row w-full">
          <p className="text-base font-medium">Total</p>{" "}
          <p className="text-base font-bold">
            ${bill.products.map((x) => x.price).reduce((a, b) => a + b)}{" "}
          </p>{" "}
        </div>
      </CardBody>
    </Card>
  );
};
