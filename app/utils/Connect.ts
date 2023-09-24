import mongoose from "mongoose";

const MONGO_URI = process.env?.MONGO_URI;

export const connect = async () => {
    await mongoose.connect(MONGO_URI!);
    console.log("Connected to DB");
};
