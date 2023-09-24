import mongoose from "mongoose";

const AdminsSchema: mongoose.Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const Admins = mongoose.models.Admins || mongoose.model("Admins", AdminsSchema);

export default Admins;
