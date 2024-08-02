import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import { cn } from "@/lib/utils";
import Topbar from "@/components/TopBar";
import BottomBar from "@/components/BottomBar";
import { Toaster } from "@/components/ui/toaster";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Connect",
  description: "A Next.js 13 Meta Connect application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "h-screen relative bg-dark-300 font-sans antialiased",
            fontSans.variable
          )}
        >
          <Topbar />
          <main className="h-full pt-28 p-8">{children}</main>
          <BottomBar />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
