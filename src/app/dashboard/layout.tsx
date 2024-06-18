import Sidebar from "@/components/dashboard/sidebar";
import SidebarProvider from "@/components/dashboard/sidebarContext";
import { RobotoFont } from "@/lib/fonts";
import DateProvider from "./_components/dateProvider";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={"overflow-hidden flex md:static" + RobotoFont.className}>
      <DateProvider>
        <SidebarProvider>
          {" "}
          <Sidebar />
          {children}
        </SidebarProvider>
      </DateProvider>
    </body>
  );
}
