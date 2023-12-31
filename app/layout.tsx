import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import SessionProvider from "./providers/SessionProvider";
import ProgressProvider from "./providers/ProgressProvider";

// To fix the fontawesome icons not showing up when using SSR
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "NoRage - Dashboard",
	description: "NoRage Dashboard for the NoRage Discord Bot & MongoDB",
	keywords: "NoRage, Dashboard, Discord, Bot, MongoDB, Hypixel, Minecraft",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SessionProvider>
			<html lang="en" className="scroll-smooth">
				<body className={inter.className + " bg-gray-800"}>
					<ProgressProvider>
						{children}
						<Analytics />
					</ProgressProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
