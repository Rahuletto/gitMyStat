import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--urbanist",
});

export const metadata: Metadata = {
  title: "gitMyStat!",
  description: "Statistics for your GitHub account, in your README.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>{children}</body>
    </html>
  );
}
