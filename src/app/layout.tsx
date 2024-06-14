import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SessionProvider } from "@/components/session/sessionProvider";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import MuiTheme from "@/components/muiTheme";
const DMSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flowers Shop",
  description: "The best flowers in the world.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className="overflow-x-hidden">
      <MuiTheme>
        <body className={DMSans.className + " overflow-hidden"}>
          <SessionProvider session={session}>
            <Header />
            {children}
            <Footer />
          </SessionProvider>
        </body>
      </MuiTheme>
    </html>
  );
}
