"use server";

import { revalidateTag } from "next/cache";

import mongoose from "mongoose";
import connectDb from "../utils/Connect";

import Users from "../models/Users";
import Premium from "../models/Premium";
import Blacklist from "../models/Blacklist";
import Usercommands from "../models/Usercommands";

import { fetchDiscordData, fetchMinecraftData } from "../utils/Fetchuser";
import { User } from "../types";

const isValidateDiscordId = async (id: string): Promise<boolean> => {
    try {
        const { error } = await fetchDiscordData(id);

        if (error) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

const isValidateMinecraftUuid = async (id: string): Promise<boolean> => {
    try {
        const { errorMessage } = await fetchMinecraftData(id);

        if (errorMessage) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const UpdatePremium = async (
    user: User
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const premiumExists = await Premium.findOne({
            discord_id: user.discord_id,
        });

        if (premiumExists !== null) {
            await Premium.deleteOne({ discord_id: user.discord_id });
            revalidateTag(`getUser-${user._id}`);
            return {
                success: true,
                message: "Successfully removed premium from user.",
            };
        } else {
            const newPremium = new Premium({
                discord_id: user.discord_id,
            });
            await newPremium.save();
            revalidateTag(`getUser-${user._id}`);
            return {
                success: true,
                message: "Successfully added premium to user.",
            };
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const updateBlacklist = async (
    user: User
): Promise<{ success: boolean; message: string }> => {
    await connectDb();

    const blacklistExists = await Blacklist.findOne({
        discord_id: user.discord_id,
    });

    if (blacklistExists !== null) {
        await Blacklist.deleteOne({ discord_id: user.discord_id });
        revalidateTag(`getUser-${user._id}`);
        return {
            success: true,
            message: "Successfully removed blacklist from user.",
        };
    } else {
        const newBlacklist = new Blacklist({
            discord_id: user.discord_id,
        });
        await newBlacklist.save();
        revalidateTag(`getUser-${user._id}`);
        return {
            success: true,
            message: "Successfully added blacklist to user.",
        };
    }
};

export const updateBugHunter = async (
    user: User
): Promise<{ success: boolean; message: string }> => {
    await connectDb();

    const userExists = await Users.findOne({
        discord_id: user.discord_id,
    });

    if (userExists === null) {
        return {
            success: false,
            message: "User not found.",
        };
    }

    userExists.bug_hunter = !userExists.bug_hunter;
    await userExists.save();
    revalidateTag(`getUser-${user._id}`);

    return {
        success: true,
        message: "Successfully updated bug hunter status.",
    };
};

export const updateUserCommands = async (
    user: User,
    commands: number
): Promise<{ success: boolean; message: string }> => {
    try {
        await connectDb();

        const userExists = await Usercommands.findOne({
            discord_id: user.discord_id,
        });

        if (userExists === null) {
            const newUser = new Usercommands({
                discord_id: user.discord_id,
                commands: commands,
            });
            await newUser.save();
            revalidateTag(`getUser-${user._id}`);
        } else {
            userExists.commands = commands;
            await userExists.save();
            revalidateTag(`getUser-${user._id}`);
        }

        return {
            success: true,
            message: "Successfully updated user commands.",
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong.",
        };
    }
};

export const getUsers = async (
    page: number = 1
): Promise<{
    success: boolean;
    message: string;
    users: User[];
    total?: number;
    available?: {
        pages: number;
        users: number;
    };
}> => {
    try {
        const fetchOptions: any = {
            method: "POST",
            next: {
                revalidate: 600,
            },
            headers: {
                Authorization: process.env.NEXTAUTH_SECRET,
            },
            body: JSON.stringify({
                page: page,
            }),
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
            fetchOptions
        );

        const { users, total, available } = await response.json();

        return {
            success: true,
            message: "Successfully retrieved users.",
            users: users,
            total: total,
            available: available,
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
            method: "POST",
            next: {
                tags: [`getUser-${id}`], // using _id as a tag
                revalidate: 600,
            },
            headers: {
                Authorization: process.env.NEXTAUTH_SECRET,
            },
        };
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
            fetchOptions
        );

        const data = await response.json();

        if (response.status !== 200) {
            return {
                success: false,
                message: data.error,
                user: null,
            };
        }

        return {
            success: true,
            message: "Successfully retrieved user.",
            user: data,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong.",
            user: null,
        };
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
