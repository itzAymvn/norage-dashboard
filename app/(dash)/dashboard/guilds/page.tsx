import { getGuilds } from "@/app/actions";

import Loader from "@/app/components/Loader";
import Guildcard from "@/app/components/Guilds/Guildcard";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import Searchguild from "@/app/components/Guilds/Searchguild";
import { Guild } from "@/app/types";

const page = async ({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) => {
    const { success, message, guilds } = await getGuilds();

    // If the request was not successful, return an error message
    if (!success) {
        return (
            <div className="min-h-full flex flex-col justify-center items-center text-white">
                <FontAwesomeIcon
                    icon={faWarning}
                    className="text-9xl text-yellow-500"
                />
                <h1 className="text-4xl font-semibold mt-5">Error</h1>
                <p className="text-xl mt-2">{message}</p>
            </div>
        );
    }

    const renderedGuilds = guilds;

    // If there is a search query, filter the users array
    if (searchParams?.search) {
        const searchQuery = searchParams.search.toString().toLowerCase();

        // Filter the
        const filteredGuilds = guilds.filter((guild: Guild) => {
            return (
                guild?.guild_name?.toLowerCase()?.includes(searchQuery) ||
                guild?.guild_id?.toLowerCase()?.includes(searchQuery)
            );
        });

        // Update the users array with the filtered users
        renderedGuilds.splice(0, guilds?.length, ...filteredGuilds);
    }
    // Return the page
    return (
        <>
            <Searchguild />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {renderedGuilds === null ? (
                    <Loader />
                ) : renderedGuilds.length === 0 ? (
                    <div className="min-h-full mt-8 w-screen flex flex-col justify-center items-center text-white">
                        <FontAwesomeIcon
                            icon={faWarning}
                            className="text-5xl md:text-9xl text-yellow-500"
                        />
                        <h1 className="text-3xl md:text-5xl font-semibold mt-5">
                            No Guilds Found
                        </h1>
                    </div>
                ) : (
                    renderedGuilds.map((guild, i) => {
                        return <Guildcard key={i} guild={guild} />;
                    })
                )}
            </div>
        </>
    );
};

export default page;
export const dynamic = "force-dynamic";
