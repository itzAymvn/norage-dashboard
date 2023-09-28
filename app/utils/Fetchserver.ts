export const fetchGuild = async (GuildID: string) => {
    try {
        const requestOptions: any = {
            method: "GET",
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            },
        };

        const guildResponse = await fetch(
            `https://discord.com/api/guilds/${GuildID}/preview`,
            requestOptions
        );

        const guildData = await guildResponse.json();

        if (guildData?.id) {
            return {
                ...guildData,
                iconURL: guildData.icon
                    ? `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.png`
                    : null,
            };
        } else {
            return { error: "Guild not found" };
        }
    } catch (error) {
        return { error: "something went wrong" };
    }
};
