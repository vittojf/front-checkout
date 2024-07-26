"use client";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const  router = useRouter();
  const { setUser, user } = useUser();

  useEffect(() => {
    if (user.email === "" && JSON.stringify(localStorage.getItem("key"))) {
      setUser({
        email: JSON.stringify(localStorage.getItem("email")),
        password: JSON.stringify(localStorage.getItem("password")),
      });
      router.push('/payment')
    }else{
      router.push('/login')

    }
  }, [user]);

  return (
    <>

    </>
  );
}
