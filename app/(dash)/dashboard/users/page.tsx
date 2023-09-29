// Components
import Loader from "@/app/components/Loader";
import Usercard from "@/app/components/Users/Usercard";
import Searchuser from "@/app/components/Users/Searchuser";

// Actions
import { getUsers } from "@/app/actions";

// Next / Types
import { Metadata } from "next";
import { User } from "@/app/types";

export const metadata: Metadata = {
    title: "NoRage | Users",
    description: "View all users linked to the bot and manage their data.",
};

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const {
        success,
        message,
        users,
    }: {
        success: boolean;
        message: string;
        users: any;
    } = await getUsers();

    // Create a copy of the users array
    const renderedUsers = users;

    // If the request was not successful, return an error message
    if (!success) {
        console.error(users);
        return <p className="text-red-500">{message}</p>;
    }

    if (!users.map) {
        return <div className="p-4 bg-red-500 text-white">{users.error}</div>;
    }

    // If there is a search query, filter the users array
    if (searchParams?.search) {
        const searchQuery = searchParams.search.toString().toLowerCase();

        // Filter the users array
        const filteredUsers = users.filter((user: User) => {
            return (
                user?.discord_id?.toLowerCase()?.includes(searchQuery) ||
                user?.minecraft_uuid?.toLowerCase()?.includes(searchQuery) ||
                user?.minecraft?.name?.toLowerCase()?.includes(searchQuery) ||
                user?.discord?.username?.toLowerCase()?.includes(searchQuery)
            );
        });

        // Update the users array with the filtered users
        renderedUsers.splice(0, users?.length, ...filteredUsers);
    }

    // Return the page
    return (
        <>
            <Searchuser />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderedUsers === null ? (
                    <Loader />
                ) : renderedUsers.length === 0 ? (
                    <p className="text-gray-400">No users to display.</p>
                ) : (
                    renderedUsers.map((user: User, i: number) => (
                        <Usercard key={i} user={user} />
                    ))
                )}
            </div>
        </>
    );
};

export default Page;
export const dynamic = "force-dynamic";
