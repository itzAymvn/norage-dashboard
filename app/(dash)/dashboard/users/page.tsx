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

    // Create an array to store all the fetch promises
    const fetchPromises = [];

    // Loop through each user and add the fetch promises to the array
    for (const user of users) {
        const mcPromise = fetch(
            `http://sessionserver.mojang.com/session/minecraft/profile/${user.minecraft_uuid}`
        ).then((response) => response.json());

        const discordPromise = fetch(
            `${NEXT_PUBLIC_BASE_URL}/api/discord/users/${user.discord_id}`,
            fetchOptions
        ).then((response) => response.json());

        // Push both promises into the array
        fetchPromises.push(mcPromise, discordPromise);
    }

    try {
        // Use Promise.all to wait for all fetch requests to complete
        const results = await Promise.all(fetchPromises);

        // Loop through the results and update user data
        for (let i = 0; i < users.length; i++) {
            const mcJson = results[i * 2];
            const discordJson = results[i * 2 + 1];

            users[
                i
            ].minecraft_avatar = `https://crafatar.com/avatars/${users[i].minecraft_uuid}?overlay=true`;
            users[i].minecraft_name = mcJson.name;
            users[i].discord_name = discordJson.username;
        }
    } catch (err) {
        // Handle any errors that occurred during fetching
        console.error("Error fetching data:", err);
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
