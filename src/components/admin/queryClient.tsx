"use client";
import React from "react";
import { QueryClient, QueryClientProvider as Provider } from "react-query";
const adminQUeryClient = new QueryClient();
export default function QueryClientProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Provider client={adminQUeryClient}>{children}</Provider>;
}
