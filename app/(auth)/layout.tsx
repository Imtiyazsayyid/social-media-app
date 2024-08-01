import React from "react";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "../globals.css";
import { cn } from "@/lib/utils";
const fontSans = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Connect",
  description: "A Next.js 13 Meta Connect application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={cn("min-h-screen bg-dark-300 font-sans antialiased", fontSans.variable)}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
