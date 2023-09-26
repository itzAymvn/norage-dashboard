import Loader from "@/app/components/Loader";
import Usercard from "@/app/components/Usercard";
import Searchuser from "@/app/components/Searchuser";
import { getUsers } from "@/app/actions";
import { cookies } from "next/headers";
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { success, message, users } = await getUsers();

    // Create a copy of the users array
    // This is so we can filter the users array without affecting the original
    const renderedUsers = users;

    // If the request was not successful, return an error message
    if (!success) {
        return <p className="text-red-500">{message}</p>;
    }

    // Set the cookies for the fetch request
    // Because the api only allows logged in users to access it
    const fetchOptions: any = {
        method: "GET",
        headers: {
            cookies: cookies(),
        },
    };

    // Loop through each user and fetch their minecraft and discord data
    for (const user of users) {
        try {
            const mcData = await fetch(
                `http://sessionserver.mojang.com/session/minecraft/profile/${user.minecraft_uuid}`
            );
            const discordData = await fetch(
                `${NEXT_PUBLIC_BASE_URL}/api/discord/users/${user.discord_id}`,
                fetchOptions
            );

            const mcJson = await mcData.json();
            const discordJson = await discordData.json();

            user.minecraft_avatar = `https://crafatar.com/avatars/${user?.minecraft_uuid}?overlay=true`;
            user.minecraft_name = mcJson.name;
            user.discord_name = discordJson.username;
        } catch (err) {
            return user;
        }
    }

    // If there is a search query, filter the users array
    if (searchParams?.search) {
        const searchQuery = searchParams.search.toString().toLowerCase();

        // Filter the users array
        const filteredUsers = users.filter((user) => {
            return (
                user?.discord_id?.toLowerCase()?.includes(searchQuery) ||
                user?.minecraft_uuid?.toLowerCase()?.includes(searchQuery) ||
                user?.minecraft_name?.toLowerCase()?.includes(searchQuery) ||
                user?.discord_name?.toLowerCase()?.includes(searchQuery)
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
                    renderedUsers.map((user, i) => (
                        <Usercard key={i} user={user} />
                    ))
                )}
            </div>
        </>
    );
};

export default Page;
