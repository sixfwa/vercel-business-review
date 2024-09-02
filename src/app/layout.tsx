import { type PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Components
import { MoseyBankHeader } from "@/components/header";

import "./globals.scss";

export const metadata: Metadata = {
  description: "A Vercel Optimizely demo website",
  keywords: "Vercel Business Review, Optimizely, Vercel, Demo",
  title: {
    default: "The Vercel Business Review",
    template: "%s - An Optimizely Demo",
  },
};

type RootLayoutProps = Readonly<PropsWithChildren<{}>>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.variable}`}>
        <main className="flex flex-col justify-between w-4/5 md:w-2/3 mx-auto mb-10 font-poppins overflow-x-hidden">
          <MoseyBankHeader />
          {children}
        </main>
      </body>
    </html>
  );
}
