import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import AuthProvider from "@/components/auth-provider";

import "./(pages)/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BusinessWave - Connect with Professional Services",
  description:
    "Connect companies with specialized professionals for administrative, legal, tax, and organizational development solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " bg-blue-100/30"}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col">
              <main className="flex-1 ">{children}</main>
            </div>

            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
