import Search from "@/components/search";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full flex flex-col items-center py-4">
      <Search className="w-10/12 " />
      {children}
    </div>
  );
}
