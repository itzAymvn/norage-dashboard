"use server";

import connectDb from "./utils/Connect";

import Premium from "./models/Premium";
import Blacklist from "./models/Blacklist";
import Users from "./models/Users";
import Usercommands from "./models/Usercommands";
import { revalidateTag } from "next/cache";
import { User } from "./types";

import { cookies } from "next/headers";
import mongoose from "mongoose";
import Guild from "./models/Guilds";

export const UpdatePremium = async (
    discord_id: string,
    premium: boolean
): Promise<{ success: boolean; message: string }> => {
    await connectDb();

    const premiumExists = await Premium.findOne({
        discord_id: discord_id,
    });

    if (premiumExists !== null) {
        if (!premium) {
            await Premium.deleteOne({ discord_id: discord_id });
            return {
                success: true,
                message: "Successfully removed premium from user.",
            };
        }
    } else {
        if (premium) {
            const newPremium = new Premium({
                discord_id: discord_id,
            });
            await newPremium.save();

            return {
                success: true,
                message: "Successfully added premium to user.",
            };
        }
    }

    return {
        success: false,
        message: "Something went wrong.",
    };
};

export const updateBlacklist = async (
    discord_id: string
): Promise<{ success: boolean; message: string }> => {
    await connectDb();

    const blacklistExists = await Blacklist.findOne({
        discord_id: discord_id,
    });

    if (blacklistExists !== null) {
        await Blacklist.deleteOne({ discord_id: discord_id });
        return {
            success: true,
            message: "Successfully removed blacklist from user.",
        };
    } else {
        const newBlacklist = new Blacklist({
            discord_id: discord_id,
        });
        await newBlacklist.save();

        return {
            success: true,
            message: "Successfully added blacklist to user.",
        };
    }
};

export const updateBugHunter = async (
    discord_id: string,
    bug_hunter: boolean
): Promise<{ success: boolean; message: string }> => {
    await connectDb();

    const user = await Users.findOne({
        discord_id: discord_id,
    });

    if (user === null) {
        return {
            success: false,
            message: "User not found.",
        };
    }

    user.bug_hunter = bug_hunter;

    await user.save();

    return {
        success: true,
        message: "Successfully updated bug hunter status.",
    };
};

export const updateUserCommands = async (
    discord_id: string,
    commands: number
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const user = await Usercommands.findOne({
            discord_id: discord_id,
        });

        if (user === null) {
            const newUser = new Usercommands({
                discord_id: discord_id,
                commands: commands,
            });
            await newUser.save();
        } else {
            user.commands = commands;
            await user.save();
        }

        return {
            success: true,
            message: "Successfully updated user commands.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const getUsers = async (): Promise<{
    success: boolean;
    message: string;
    users: User[];
}> => {
    try {
        const fetchOptions: any = {
            headers: {
                cookie: cookies(),
            },
            cache: "force-cache",
            next: {
                tags: ["getUsers"],
            },
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            fetchOptions
        );

        const users = await response.json();

        return {
            success: true,
            message: "Successfully retrieved users.",
            users: users,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
            users: [],
        };
    }
};

export const getUser = async (
    id: string
): Promise<{ success: boolean; message: string; user: User | null }> => {
    try {
        const fetchOptions: any = {
            headers: {
                cookie: cookies(),
            },
            cache: "force-cache",
            next: {
                tags: [`getUser-${id}`],
            },
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
            fetchOptions
        );

        const user = await response.json();

        return {
            success: true,
            message: "Successfully retrieved user.",
            user: user,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
            user: null,
        };
    }
};

const isValidateDiscordId = async (id: string): Promise<boolean> => {
    try {
        const fetchOptions: any = {
            headers: {
                cookie: cookies(),
            },
            cache: "force-cache",
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/discord/users/${id}`,
            fetchOptions
        );

        const user = await response.json();
        if (user?.error) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

const isValidateMinecraftUuid = async (id: string): Promise<boolean> => {
    try {
        const fetchOptions: any = {
            headers: {
                cookie: cookies(),
            },
            cache: "force-cache",
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/minecraft/${id}`,
            fetchOptions
        );

        const user = await response.json();
        if (user?.error) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const UpdateUserDiscord = async (
    id: string,
    discord_id: string
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const user = await Users.findOne({
            _id: id,
        });

        if (user === null) {
            return {
                success: false,
                message: "User not found.",
            };
        }

        // Check if ID is valid
        const isValidDiscordId = await isValidateDiscordId(discord_id);

        if (!isValidDiscordId) {
            return {
                success: false,
                message: "Invalid discord id.",
            };
        }

        const userWithDiscordId = await Users.findOne({
            discord_id: discord_id,
            _id: { $ne: id },
        });

        if (userWithDiscordId !== null) {
            return {
                success: false,
                message: "This discord id is already in use.",
            };
        }

        user.discord_id = discord_id;

        await user.save();

        revalidateTag(`getUser-${id}`);

        return {
            success: true,
            message: "Successfully updated discord id.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const UpdateUserMinecraft = async (
    id: string,
    minecraft_uuid: string
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const user = await Users.findOne({
            _id: id,
        });

        if (user === null) {
            return {
                success: false,
                message: "User not found.",
            };
        }

        const isValidMinecraftUuid = await isValidateMinecraftUuid(
            minecraft_uuid
        );

        if (!isValidMinecraftUuid) {
            return {
                success: false,
                message: "Invalid minecraft uuid.",
            };
        }

        const userWithMinecraftUuid = await Users.findOne({
            minecraft_uuid: minecraft_uuid,
            _id: { $ne: id },
        });

        if (userWithMinecraftUuid !== null) {
            return {
                success: false,
                message: "This minecraft uuid is already in use.",
            };
        }

        user.minecraft_uuid = minecraft_uuid;

        await user.save();

        revalidateTag(`getUser-${id}`);

        return {
            success: true,
            message: "Successfully updated minecraft uuid.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const RemoveAchievement = async (
    achievement_id: string
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const user = await Users.findOne({
            "achievements._id": new mongoose.Types.ObjectId(achievement_id),
        });

        if (user === null) {
            return {
                success: false,
                message: "User not found.",
            };
        }

        await Users.updateOne(
            { _id: user._id },
            {
                $pull: {
                    achievements: {
                        _id: new mongoose.Types.ObjectId(achievement_id),
                    },
                },
            }
        );

        revalidateTag(`getUser-${user._id}`);

        return {
            success: true,
            message: "Successfully removed achievement.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const getGuilds = async (): Promise<{
    success: boolean;
    message: string;
    guilds: any[];
}> => {
    try {
        const fetchOptions: any = {
            headers: {
                cookie: cookies(),
            },
            cache: "force-cache",
            next: {
                tags: ["getGuilds"],
            },
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/guilds`,
            fetchOptions
        );

        const guilds = await response.json();

        return {
            success: true,
            message: "Successfully retrieved guilds.",
            guilds: guilds,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
            guilds: [],
        };
    }
};

export const getGuild = async (
    id: string
): Promise<{ success: boolean; message: string; guild: any | null }> => {
    try {
        const fetchOptions: any = {
            headers: {
                cookie: cookies(),
            },
            cache: "force-cache",
            next: {
                tags: [`getGuild-${id}`],
            },
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/guilds/${id}`,
            fetchOptions
        );

        const guild = await response.json();

        if (guild.error) {
            return {
                success: false,
                message: guild.error,
                guild: null,
            };
        }

        return {
            success: true,
            message: "Successfully retrieved guild.",
            guild: guild,
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
    id: string,
    prefix: string
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const guild = await Guild.findOne({
            guild_id: id,
        });

        if (guild === null) {
            return {
                success: false,
                message: "Guild not found.",
            };
        }

        guild.prefix = prefix;

        await guild.save();

        revalidateTag(`getGuild-${id}`);

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
