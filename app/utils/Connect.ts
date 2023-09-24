import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI!);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;
