import Sidebar from "@/components/admin/sidebar";
import SidebarProvider from "@/components/admin/sidebarContext";
import { RobotoFont } from "@/lib/fonts";
import BreadcrumbsComponents from "@/components/admin/breadcrumbs";
import DialogProvider from "@/components/admin/dialog";
import QueryClientProvider from "@/components/admin/queryClient";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body
      className={
        "overflow-hidden flex md:static bg-customBackground " +
        RobotoFont.className
      }
    >
      <QueryClientProvider>
        <DialogProvider>
          <SidebarProvider>
            <Sidebar />
            <div className="py-4 px-4 flex-col gap-10 flex-1">
              <BreadcrumbsComponents />
              {children}
            </div>
          </SidebarProvider>
        </DialogProvider>
      </QueryClientProvider>
    </body>
  );
}
