import Link from "next/link";

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
                <Link
                    href="/dashboard/premium"
                    className="bg-gray-700 rounded-md p-4 space-y-2 cursor-pointer hover:bg-gray-600"
                >
                    <h1 className="text-white text-xl font-bold">
                        Premium Users
                    </h1>
                    <p className="text-gray-400">Manage all premium users.</p>
                </Link>
                <Link
                    href="/dashboard/guilds"
                    className="bg-gray-700 rounded-md p-4 space-y-2 cursor-pointer hover:bg-gray-600"
                >
                    <h1 className="text-white text-xl font-bold">Guilds</h1>
                    <p className="text-gray-400">
                        View all guilds the bot is in and edit their settings.
                    </p>
                </Link>
                <Link
                    href="/dashboard/blacklist"
                    className="bg-gray-700 rounded-md p-4 space-y-2 cursor-pointer hover:bg-gray-600"
                >
                    <h1 className="text-white text-xl font-bold">
                        Blacklisted Users & Guilds
                    </h1>
                    <p className="text-gray-400">
                        View all blacklisted users and guilds and manage their
                    </p>
                </Link>
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
