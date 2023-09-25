"use server";

import Premium from "./models/Premium";
import Blacklist from "./models/Blacklist";
import Users from "./models/Users";

export const UpdatePremium = async (
    discord_id: string,
    premium: boolean
): Promise<{ success: boolean; message: string }> => {
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
