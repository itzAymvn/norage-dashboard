import { User } from "../types";
import { cookies } from "next/headers";

export const fetchMinecraftData = async (user: User) => {
    const minecraftResponse = await fetch(
        "http://sessionserver.mojang.com/session/minecraft/profile/" +
            user.minecraft_uuid
    );

    const minecraftData = await minecraftResponse.json();
    return minecraftData;
};

export const fetchDiscordData = async (user: User) => {
    const fetchOptions: any = {
        method: "GET",
        headers: {
            cookies: cookies(),
        },
    };

    const discordResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/users/${user.discord_id}`,
        fetchOptions
    );

    const discordData = await discordResponse.json();
    return discordData;
};
