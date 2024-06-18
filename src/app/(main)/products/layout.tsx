import Search from "@/components/main/search";
import { fetchCategorys } from "@/lib/api";
import { Category } from "@prisma/client";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const categorys: Category[] = await fetchCategorys();
  return (
    <div className="w-full flex flex-col items-center py-4">
      <Search className="w-10/12 " categorys={categorys} />
      {children}
    </div>
  );
}
