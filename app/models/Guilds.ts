import mongoose from "mongoose";

export interface Guild {
    _id: string;
    guild_id: string;
    guild_icon: string;
    guild_name: string;
    guild_description: string;
    prefix: string;
    blacklisted: boolean;
    createdAt: Date | string;
    updatedAt: Date | string;
}

const guildSchema: mongoose.Schema = new mongoose.Schema(
    {
        guild_id: {
            type: String,
            required: true,
            unique: true,
        },

        prefix: {
            type: String,
            required: true,
            default: "!",
        },

        guild_icon: {
            type: String,
            required: false,
            default: null,
        },

        guild_name: {
            type: String,
            required: true,
            default: null,
        },

        guild_description: {
            type: String,
            required: false,
            default: null,
        },
    },
    { timestamps: true }
);

const Guild = mongoose.models.Guild || mongoose.model("Guild", guildSchema);

export default Guild;
