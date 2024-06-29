import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { DeviceProvider } from "@/providers/DeviceProvider";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--urbanist",
});

export const viewport: Viewport = {
  themeColor: "#0D1116",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "gitMyStat!",
  description: "Turn your GitHub activity into sleek stats and cool visuals",
  icons: {
    icon: "/favicon.ico",
  },
  category: "tool",
  openGraph: {
    siteName: "gitMyStat!",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/banner.png",
        alt: "gitMyStat!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: "/banner.png",
        alt: "gitMyStat!",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <DeviceProvider>{children}</DeviceProvider>
      </body>
    </html>
  );
}
