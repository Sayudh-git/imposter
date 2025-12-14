import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { GameProvider } from "@/context/GameContext";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kolkata Imposter",
  description: "Pass & Play Social Deduction Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          "min-h-screen bg-background font-body text-text-primary antialiased"
        )}
      >
        <GameProvider>
          {children}
          <Toaster />
        </GameProvider>
      </body>
    </html>
  );
}
