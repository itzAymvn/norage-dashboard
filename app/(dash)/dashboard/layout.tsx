import Header from "@/app/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NoRage - Dashboard",
    description: "NoRage Dashboard for the NoRage Discord Bot & MongoDB",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen flex flex-col">
            <Header />
            <main className="bg-gray-800 flex-grow p-4">{children}</main>
            <footer className="bg-gray-900 p-4 text-center text-white">
                <p>© {new Date().getFullYear()} NoRage</p>
            </footer>
        </main>
    );
};

export default Layout;
