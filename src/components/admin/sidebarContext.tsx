"use client";
import { createContext, useState } from "react";

export const sidebarContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>({} as any);
export default function SidebarProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <sidebarContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </sidebarContext.Provider>
  );
}
