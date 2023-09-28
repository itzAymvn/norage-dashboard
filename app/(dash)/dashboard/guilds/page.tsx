import { getGuilds } from "@/app/actions";

import Loader from "@/app/components/Loader";
import Guildcard from "@/app/components/Guilds/Guildcard";

const page = async () => {
    const { success, message, guilds } = await getGuilds();

    // If the request was not successful, return an error message
    if (!success) {
        return <p className="text-red-500">{message}</p>;
    }

    // Return the page
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {guilds === null ? (
                    <Loader />
                ) : guilds.length === 0 ? (
                    <p className="text-center text-gray-500">
                        No guilds found.
                    </p>
                ) : (
                    guilds.map((guild, i) => {
                        return <Guildcard key={i} guild={guild} />;
                    })
                )}
            </div>
        </>
    );
};

export default page;
