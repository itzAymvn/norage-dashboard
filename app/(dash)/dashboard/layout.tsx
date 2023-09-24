import Header from "@/app/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <main className="bg-gray-800 p-4 h-full">{children}</main>
        </>
    );
};

export default Layout;
