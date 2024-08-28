import { type PropsWithChildren } from "react";
import type { Metadata } from "next";

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
      <body>
        <main className="flex flex-col justify-between w-2/3 mx-auto">
          <MoseyBankHeader />
          {children}
          {/* <MoseyBankFooter /> */}
        </main>
      </body>
    </html>
  );
}
