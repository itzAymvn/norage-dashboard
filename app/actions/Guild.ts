"use server";

import { revalidateTag } from "next/cache";

import connectDb from "../utils/Connect";

import Guild from "../models/Guilds";
import Blacklist from "../models/Blacklist";

import { Guild as GuildType } from "../types";

export const getGuilds = async (): Promise<{
    success: boolean;
    message: string;
    guilds: any[];
}> => {
    const fetchOptions: any = {
        method: "POST",
        next: {
            revalidate: 600,
        },
        headers: {
            Authorization: process.env.NEXTAUTH_SECRET,
        },
    };
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/guilds`,
        fetchOptions
    );

    const data = await response.json();

    if (response.status !== 200) {
        return {
            success: false,
            message: data.error,
            guilds: [],
        };
    }

    return {
        success: true,
        message: "Successfully retrieved guilds.",
        guilds: data,
    };
};

export const getGuild = async (
    id: string
): Promise<{ success: boolean; message: string; guild: any | null }> => {
    try {
        const fetchOptions: any = {
            method: "POST",
            next: {
                tags: [`getGuild-${id}`], // using _id as a tag
                revalidate: 600,
            },
            headers: {
                Authorization: process.env.NEXTAUTH_SECRET,
            },
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/guilds/${id}`,
            fetchOptions
        );

        const data = await response.json();

        if (response.status !== 200) {
            return {
                success: false,
                message: data.error,
                guild: null,
            };
        }

        return {
            success: true,
            message: "Successfully retrieved guild.",
            guild: data,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
            guild: null,
        };
    }
};

export const UpdateGuildPrefix = async (
    guild: GuildType,
    prefix: string
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const guildExists = await Guild.findOne({
            guild_id: guild.guild_id,
        });

        if (guildExists === null) {
            return {
                success: false,
                message: "Guild not found.",
            };
        }

        guildExists.prefix = prefix;
        await guildExists.save();

        revalidateTag(`getGuild-${guild._id}`); // using _id as a tag

        return {
            success: true,
            message: "Successfully updated guild prefix.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const UpdateGuildBlacklist = async (
    guild: GuildType
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const blacklistExists = await Blacklist.findOne({
            discord_id: guild.guild_id,
        });

        if (blacklistExists !== null) {
            await Blacklist.deleteOne({ discord_id: guild.guild_id });
            revalidateTag(`getGuild-${guild._id}`);
            return {
                success: true,
                message: "Successfully removed blacklist from guild.",
            };
        } else {
            const newBlacklist = new Blacklist({
                discord_id: guild.guild_id,
            });
            await newBlacklist.save();
            revalidateTag(`getGuild-${guild._id}`);
            return {
                success: true,
                message: "Successfully added blacklist to guild.",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};
