
"use client"
import { UserProvider } from "@/context/userContext";
import React from "react";
function HomeProvider({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

export default HomeProvider;
