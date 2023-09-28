import { User } from "../types";

export const fetchMinecraftData = async (user: User) => {
    const minecraftResponse = await fetch(
        "http://sessionserver.mojang.com/session/minecraft/profile/" +
            user.minecraft_uuid
    );

    const minecraftData = await minecraftResponse.json();
    return minecraftData;
};

export const fetchDiscordData = async (user: User) => {
    try {
        const requestOptions: any = {
            method: "GET",
            headers: {
                Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
            },
            redirect: "follow",
        };

        const discordResponse = await fetch(
            `https://discord.com/api/users/${user.discord_id}`,
            requestOptions
        );

        const discordData = await discordResponse.json();

        if (discordData?.id) {
            return {
                ...discordData,
                avatarURL: `https://cdn.discordapp.com/avatars/${user.discord_id}/${discordData.avatar}.png`,
            };
        } else {
            return { error: "User not found" };
        }
    } catch (error) {
        return { error: "something went wrong" };
    }
};
