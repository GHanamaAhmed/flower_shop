import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { SessionProvider } from "@/components/session/sessionProvider";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import MuiTheme from "@/components/muiTheme";
import "../globals.css";
const DMSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flowers Shop",
  description: "The best flowers in the world.",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={"overflow-hidden " + DMSans.className}>
        <div>
          <MuiTheme>
            <SessionProvider session={session}>
              <Header />
              {children}
              <Footer />
            </SessionProvider>
          </MuiTheme>
        </div>
      </body>
    </html>
  );
}
