import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react"

export const BillPayment = ({ bill }) => {


    return <Card className="border border-dashed border-white/40 w-full h-auto">
        <CardHeader>
            <h2>Bill</h2>
        </CardHeader>
        <CardBody className="px-12 flex flex-col gap-10">
            {bill.products.map(x => {
                return <div className="flex justify-between flex-row w-full"><p className=" text-base font-medium">{x.name}</p><p className="text-xl font-bold">${x.price} </p></div>
            })}

            <Divider></Divider>
            <div className="flex justify-between flex-row w-full"><p className="text-xl font-medium">Total</p> <p className="text-xl font-bold">${bill.products.map(x => x.price).reduce((a, b) => a + b)} </p> </div>
        </CardBody>
    </Card>
}