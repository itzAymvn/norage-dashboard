import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import SessionProvider from "./providers/SessionProvider";
import { connect } from "./utils/Connect";
import Image from "next/image";

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
    try {
        await connect();
        return (
            <SessionProvider>
                <html lang="en">
                    <body className={inter.className + " bg-gray-800"}>
                        {children}
                    </body>
                </html>
            </SessionProvider>
        );
    } catch (error) {
        return (
            <html lang="en">
                <body className={inter.className}>
                    <div className="flex flex-col items-center justify-center w-screen h-screen">
                        <Image
                            src="/logo.png"
                            alt="NoRage Logo"
                            width={128}
                            height={128}
                        />
                        <h1 className="text-4xl font-bold">NoRage</h1>
                        <p className="text-xl font-semibold">
                            An error occurred while connecting to the database.
                        </p>
                    </div>
                </body>
            </html>
        );
    }
}
