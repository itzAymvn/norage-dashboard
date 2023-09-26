"use server";

import connectDb from "./utils/Connect";

import Premium from "./models/Premium";
import Blacklist from "./models/Blacklist";
import Users from "./models/Users";
import Usercommands from "./models/Usercommands";
import { User } from "./types";

import { cookies } from "next/headers";

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
    discord_id: string,
    blacklisted: boolean
): Promise<{ success: boolean; message: string }> => {
    await connectDb();

    const blacklistExists = await Blacklist.findOne({
        discord_id: discord_id,
    });

    if (blacklistExists !== null) {
        if (!blacklisted) {
            await Blacklist.deleteOne({ discord_id: discord_id });
            return {
                success: true,
                message: "Successfully removed blacklist from user.",
            };
        }
    } else {
        if (blacklisted) {
            const newBlacklist = new Blacklist({
                discord_id: discord_id,
            });
            await newBlacklist.save();

            return {
                success: true,
                message: "Successfully added blacklist to user.",
            };
        }
    }

    return {
        success: false,
        message: "Something went wrong.",
    };
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

    if (user.bug_hunter === bug_hunter) {
        return {
            success: false,
            message: "User is already a bug hunter.",
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
