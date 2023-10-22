import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "./components/theme-provider";
import { QueryProvider } from "./components/query-client";
import { Toaster } from "@/components/ui/toast/toaster";

import { cn } from "@/utils/ui";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quick Hire",
  description: "Intersection of Best Jobs with Best Companies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background text-primary antialiased")}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
