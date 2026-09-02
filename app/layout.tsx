import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMFAH Frontend",
  description: "AMFAH MVP frontend application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
