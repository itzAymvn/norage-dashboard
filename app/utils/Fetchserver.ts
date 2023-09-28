import { cookies } from "next/headers";

export const fetchGuild = async (GuildID: string) => {
    const fetchOptions: any = {
        method: "GET",
        headers: {
            cookies: cookies(),
        },
    };

    const discordResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/guilds/${GuildID}`,
        fetchOptions
    );

    const discordData = await discordResponse.json();
    return discordData;
};
