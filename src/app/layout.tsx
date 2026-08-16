import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkWrapper } from "@/components/clerk-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AIAssistantDrawer } from "@/components/ai-assistant-drawer";
import { AiAvatar } from "@/components/ai-avatar";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kishore Biradar | AI Engineer & Full-Stack Developer Portfolio",
  description: "Showcasing confidence-calibrated PyTorch networks, low-latency edge AI pipelines, and interactive recruiter-customized job specifications.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Kishore Biradar | AI Engineer & Full-Stack Developer Portfolio",
    description: "Showcasing confidence-calibrated PyTorch networks, low-latency edge AI pipelines, and interactive recruiter-customized job specifications.",
    url: "/",
    siteName: "Kishore Biradar Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishore Biradar | AI Engineer & Full-Stack Developer Portfolio",
    description: "Showcasing confidence-calibrated PyTorch networks, low-latency edge AI pipelines, and interactive recruiter-customized job specifications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkWrapper>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <Navbar />
              <main className="flex-1 flex flex-col w-full">
                {children}
              </main>
              <Footer />
              <AIAssistantDrawer />
              <AiAvatar />
              <Toaster closeButton position="bottom-right" theme="dark" richColors />
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkWrapper>
  );
}




