import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "National Auto Loan Network - Anam Demo",
  description:
    "National Auto Loan Network - Experience seamless auto loan refinancing with over $2 billion in refinanced loans for over 100,000 satisfied customers since 2010. Chat with our AI assistant Mia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>{children}</body>
    </html>
  );
} 