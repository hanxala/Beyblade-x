import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from '@clerk/nextjs';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Beyblade-X | India's Premier Beyblade Tournament Platform",
  description: "Join India's most thrilling Beyblade tournament platform. Compete, climb the ranks, and become a legendary blader! Find tournaments, view rankings, and connect with the community.",
  keywords: "Beyblade, tournaments, India, rankings, competition, gaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} ${orbitron.variable}`}>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
