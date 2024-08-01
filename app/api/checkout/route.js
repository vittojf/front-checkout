import axios from "axios";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { payment_date, payment_stripe_record, products, location } =await req.json();

  const session = req.cookies.get("session");

  if (!session) {
    return NextResponse.json({ message: "no token" });
  }

  try {
    const token = verify(session.value, "test");

    if (!token) {
      return NextResponse.json({ message: "felicidades" });
      // return res.status(401).json({ error: "no token" });
    }
    const idProdycts = products.map((x) => x.id);
    const resApi = await axios.post(
      "http://localhost:5000/add-item",
      {
        payment_date,
        payment_stripe_record,
        products: idProdycts,
        location,
      },
      {
        headers: {
          Authorization: session.value,
        },
      }
    );

    return NextResponse.json({ ...resApi.data });
  } catch (error) {
   
    return NextResponse.json({ message: "error :C", error });
  }
}
