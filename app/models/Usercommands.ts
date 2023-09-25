import mongoose from "mongoose";

const botSchema: mongoose.Schema = new mongoose.Schema(
    {
        commands: {
            type: Number, // Change to Number or Integer
            required: true,
            default: 0, // Set an initial value of 0
        },
        discord_id: {
            type: String,
            required: true,
        },
    },
    { collection: "bots" }
);

const Usercommands =
    mongoose.models.Usercommands || mongoose.model("Usercommands", botSchema);

export default Usercommands;
