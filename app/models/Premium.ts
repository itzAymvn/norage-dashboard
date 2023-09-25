import mongoose from "mongoose";

const premiumSchema = new mongoose.Schema(
    {
        discord_id: {
            type: String,
            required: true,
        },
    },
    { collection: "premiumusers" }
);

const Premium =
    mongoose.models.Premium || mongoose.model("Premium", premiumSchema);

export default Premium;
