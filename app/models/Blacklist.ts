import mongoose from "mongoose";

const blacklistSchema: mongoose.Schema = new mongoose.Schema(
    {
        discord_id: {
            type: String,
            required: true,
        },
    },
    { collection: "blacklists", timestamps: true }
);

const Blacklist =
    mongoose.models.Blacklist || mongoose.model("Blacklist", blacklistSchema);

export default Blacklist;
