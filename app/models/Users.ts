import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema(
    {
        discord_id: {
            type: String,
            required: true,
            unique: true,
        },
        minecraft_uuid: {
            type: String,
            required: true,
            unique: true,
        },
        achievements: {
            type: Array,
            default: [],
        },
        bug_hunter: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Users = mongoose.models?.Users || mongoose.model("Users", userSchema);

export default Users;
