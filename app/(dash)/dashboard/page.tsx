import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "NoRage | Dashboard",
    description: "Manage your account and view your linked accounts.",
};

const Page = () => {
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Link
                    href="/dashboard/users"
                    className="bg-gray-700 rounded-md p-4 space-y-2 cursor-pointer hover:bg-gray-600"
                >
                    <h1 className="text-white text-xl font-bold">
                        Linked Users
                    </h1>
                    <p className="text-gray-400">
                        View all users linked to the bot and manage their data.
                    </p>
                </Link>

                <div className="bg-gray-700 rounded-md p-4 space-y-2 cursor-pointer hover:cursor-not-allowed">
                    <h1 className="text-white text-xl font-bold">Guilds</h1>
                    <p className="text-gray-400">
                        View all guilds the bot is in and edit their settings.
                    </p>
                </div>

                <div className="p-4 space-y-2 cursor-pointer">
                    <h1 className="text-white text-xl font-bold">More Soon</h1>
                    <p className="text-gray-400">
                        More features will be added soon.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Page;
