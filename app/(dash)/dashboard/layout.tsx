import Header from "@/app/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NoRage - Dashboard",
    description: "NoRage Dashboard for the NoRage Discord Bot & MongoDB",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen">
            <Header />
            <main className="bg-gray-800 p-4 h-100">{children}</main>
        </main>
    );
};

export default Layout;
