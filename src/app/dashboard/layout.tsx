import DashNavbar from "@/components/DashNavbar";
import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Fridge | Dashboard",
  description: "Smart Fridge app to monitor the fridge remotely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
          <div className="antialiased flex flex-col w-[100%]">
          <DashNavbar />
            {children}
          </div>


  );
}
