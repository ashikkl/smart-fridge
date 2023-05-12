import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata : Metadata = {
  title: "Smart Fridge",
  description: "Smart Fridge app to monitor the fridge remotely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + "min-h-screen transition-colors"}>
        <Providers>
          <div className="main antialiased dark:bg-slate-900">
            <div className="gradient " />
          </div>

          <Navbar />
          <main className="app">{children}</main>
        </Providers>

        {/* Allow more height for mobile menu on mobile */}
        <div className="h-40 md:hidden" />
      </body>
    </html>
  );
}
