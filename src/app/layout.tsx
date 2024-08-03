import type { Metadata } from "next";
import { SessionProvider } from "@/components/main/session/sessionProvider";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import "./globals.css";
import NotificationProvider from "@/components/admin/notification";
// export const metadata: Metadata = {
//   title: "Flowers Shop",
//   description: "The best flowers in the world.",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className="overflow-x-hidden">
      <SessionProvider session={session}>
        <NotificationProvider>{children}</NotificationProvider>
      </SessionProvider>
    </html>
  );
}
