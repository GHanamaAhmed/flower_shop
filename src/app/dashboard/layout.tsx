import React from "react";
import "../globals.css";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  <html lang="en" className="overflow-x-hidden">
    <body className={"overflow-hidden"}>{children}</body>
  </html>;
}
