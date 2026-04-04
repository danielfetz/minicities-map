import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Cities Map",
  description:
    "Discover children's play cities worldwide — Mini-Munich, Mini-Salzburg, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
