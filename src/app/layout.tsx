import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Children } from "@/interfaces";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";

const font = Raleway({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home - LearnJapanese",
  description: "Improve your skills through interactive practice.",
  openGraph: {
    title: `LearnJapanese`,
    description: `Improve your skills through interactive practice.`,
    images: ["/logo.svg"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: Children) {
  return (
    <ThemeProvider>
      <ModalProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${font.className} antialiased`}>
            <Layout>{children}</Layout>
          </body>
        </html>
      </ModalProvider>
    </ThemeProvider>
  );
}
