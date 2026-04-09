import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { getSiteSettings } from "@/lib/site-settings-actions";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DesaHub | Platform Multi-Tenant Desa Digital",
    template: "%s | DesaHub",
  },
  description: "Platform digital untuk modernisasi tata kelola desa dengan satu infrastruktur tunggal.",
  keywords: ["saas desa", "desa digital", "tata kelola desa", "multi-tenant"],
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "DesaHub",
    title: "DesaHub | Platform Multi-Tenant Desa Digital",
    description: "Platform digital untuk modernisasi tata kelola desa.",
    images: [{ url: "/Background utama.png", width: 1200, height: 630, alt: "DesaHub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesaHub",
    description: "Platform digital untuk modernisasi tata kelola desa.",
    images: ["/Background utama.png"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ErrorBoundary>
          <FirebaseClientProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </FirebaseClientProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
