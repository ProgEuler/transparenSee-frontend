import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "TransparenSee",
  description: "Building Trust Through Transparency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
         <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
