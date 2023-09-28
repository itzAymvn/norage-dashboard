import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        if (mongoose.connections[0].readyState) return;
        const conn = await mongoose.connect(MONGO_URI!);
        console.log(`Connected to MongoDB: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDb;
