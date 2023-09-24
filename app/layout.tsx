import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SessionProvider from "./providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "NoRage - Dashboard",
    description: "NoRage Dashboard for the NoRage Discord Bot & MongoDB",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <html lang="en">
                <body className={inter.className + " bg-gray-800"}>
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}
