import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AssTech - Help newbie to learn",
  description: "Want to learn programming",
  icons: {
    icon: [
      { url: "/ass-tech-logo.png", type: "image/png", sizes: "32x32" }, // Favicon
      { url: "/ass-tech-logo.png", type: "image/png", sizes: "192x192" }, // Android
    ],
    apple: "/ass-tech-logo.png", // Apple Touch Icon
  },
  openGraph: {
    title: "AssTech",
    description: "The best place to learn programming",
    url: "asstech.vercel.app", 
    type: "website",
    images: [
      {
        url: "/ass-tech-logo.png", // Social media preview image (1200x630 recommended)
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}
