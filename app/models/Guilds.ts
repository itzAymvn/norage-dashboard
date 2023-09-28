import mongoose from "mongoose";

const guildSchema: mongoose.Schema = new mongoose.Schema({
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
});

const Guild = mongoose.models.Guild || mongoose.model("Guild", guildSchema);

export default Guild;
