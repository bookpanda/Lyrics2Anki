import { OpenContextProvider } from "@/contexts/openProvider";
import "@styles/globals.scss";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { AppProvider } from "src/contexts/appProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Lyrics2Anki",
    description: "Anki cards from Spotify lyrics",
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <AppProvider>
            <OpenContextProvider>
                <html lang="en">
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="favicon/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="favicon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="favicon/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="favicon/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                    <body className={inter.className}>
                        <div className="box-border h-screen w-screen bg-gray-800">
                            {children}
                            <Analytics />
                            {/* <Toaster /> */}
                        </div>
                    </body>
                </html>
            </OpenContextProvider>
        </AppProvider>
    );
}
