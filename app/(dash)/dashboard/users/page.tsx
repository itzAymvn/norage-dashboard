// Components
import Loader from "@/app/components/Loader";
import Usercard from "@/app/components/Users/Usercard";
import Searchuser from "@/app/components/Users/Searchuser";

// Actions
import { getUsers } from "@/app/actions/User";

// Next / Types
import { Metadata } from "next";
import { User } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

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

    // If the request was not successful, return an error message
    if (!success) {
        return (
            <div className="p-4 bg-red-500 text-white">
                {message}
                <br />
                <br />
                Please try again later.
            </div>
        );
    }

    if (!users.map) {
        return <div className="p-4 bg-red-500 text-white">{users.error}</div>;
    }

    const renderedUsers = users;

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

            {renderedUsers === null ? (
                <Loader />
            ) : renderedUsers.length === 0 ? (
                <>
                    <Searchuser />

                    <div className="mt-8 w-full h-full flex flex-col justify-center items-center text-white">
                        <FontAwesomeIcon
                            icon={faWarning}
                            className="text-5xl md:text-9xl text-yellow-500"
                        />
                        <h1 className="text-3xl md:text-5xl font-semibold mt-5">
                            No Users Found
                        </h1>
                    </div>
                </>
            ) : (
                <>
                    <Searchuser />

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {renderedUsers.map((user: User, i: number) => (
                            <Usercard key={i} user={user} />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

export default Page;
export const dynamic = "force-dynamic";
