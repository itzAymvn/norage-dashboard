export const fetchMinecraftData = async (uuid: string) => {
    const minecraftResponse = await fetch(
        "http://sessionserver.mojang.com/session/minecraft/profile/" +
            uuid.replace(/-/g, "")
    );

    const minecraftData = await minecraftResponse.json();
    return minecraftData;
};

export const fetchDiscordData = async (id: string) => {
    try {
        const requestOptions: any = {
            method: "GET",
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            },
            next: {
                revalidate: 60,
            },
            redirect: "follow",
        };

        const discordResponse = await fetch(
            `https://discord.com/api/users/${id}`,
            requestOptions
        );

        const discordData = await discordResponse.json();

        if (discordData?.id) {
            return {
                ...discordData,
                avatarURL: `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.png`,
            };
        } else {
            return { error: "User not found" };
        }
    } catch (error) {
        return { error: "something went wrong" };
    }
};

// example usage di
