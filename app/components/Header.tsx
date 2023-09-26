import Image from "next/image";
import Link from "next/link";
import Signout from "./Buttons/Signout";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800">
            <Link className="flex items-center space-x-4" href="/dashboard">
                <Image
                    src="/logo.png"
                    alt="NoRage Logo"
                    width={48}
                    height={48}
                    priority
                />
            </Link>

            <div className="flex items-center space-x-4">
                <Link
                    href="/dashboard"
                    className="bg-gray-700 text-white rounded-md p-2 space-y-2 cursor-pointer hover:bg-gray-600"
                >
                    Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                    <Signout />
                </div>
            </div>
        </header>
    );
};

export default Header;
