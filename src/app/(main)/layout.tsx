import type { Metadata } from "next";
import Header from "@/components/main/header";
import Footer from "@/components/main/footer";
import "../globals.css";
import { DMSans } from "@/lib/fonts";
export const metadata: Metadata = {
  title: "Flowers Shop",
  description: "The best flowers in the world.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={"overflow-hidden " + DMSans.className}>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </body>
  );
}
