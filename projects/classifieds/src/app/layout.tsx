import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import { QueryProvider } from "@/app/providers/query-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { cn } from "@/shared/lib/utils";
import { Toaster } from "@/shared/ui/sonner";
import { Header } from "@/widgets/header";
import { Message } from "@/widgets/message";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CLASSIFIEDS",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={cn("font-sans antialiased", geist.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="mx-auto w-full max-w-[1340px] flex-1 px-4 pt-14 pb-4">
            <QueryProvider>{children}</QueryProvider>
          </main>
          <Toaster
            position="top-right"
            richColors
            offset={{ top: 80, right: 16 }}
            mobileOffset={{ top: 72, right: 16 }}
          />
          <Message />
        </ThemeProvider>
      </body>
    </html>
  );
}
