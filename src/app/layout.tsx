import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkWrapper } from "@/components/clerk-wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RecruiterStickyPill } from "@/components/recruiter-sticky-pill";
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
  title: "AI Engineer Portfolio | Machine Learning & Full-Stack AI Product Architect",
  description: "Premium engineering portfolio showcasing Production AI/ML pipelines, Full-Stack AI products, and interactive Recruiter Mode customization.",
  metadataBase: new URL("http://localhost:3000"), // Will be updated to production URL later
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
              <RecruiterStickyPill />
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




