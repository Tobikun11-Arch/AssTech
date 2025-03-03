import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider/Provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "../components/ui/toaster"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AssTech - Learn, Grow, and Succeed in Tech",
  description: "The best place to learn programming",
  icons: {
    icon: [
      { url: "/ass-tech-logo.png", type: "image/png", sizes: "32x32" }, // Favicon
      { url: "/ass-tech-logo.png", type: "image/png", sizes: "192x192" }, // Android
    ],
    apple: "/ass-tech-logo.png", // Apple Touch Icon
  },
  openGraph: {
    title: "AssTech - Learn, Grow, and Succeed in Tech",
    description: "The best place to learn programming",
    url: "asstech.vercel.app", 
    type: "website",
    images: [
      {
        url: "/openGraphUrl.png", // Social media preview image (1200x630 recommended)
        width: 1200,
        height: 630,
        alt: "Asstech Preview",
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
      <head>
        <link rel="icon" href="/ass-tech-logo.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
        {children}
        <Toaster />
        <SpeedInsights />
        </QueryProvider>
      </body>
    </html>
  );
}
