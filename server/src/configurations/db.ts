import mongoose from "mongoose";
import { config } from '../config';

const connectDB = async () => {
    try {
        if(!config.MONGO_URI){
            throw new Error("MONGO_URI is not defined")

        }

        await mongoose.connect(config.MONGO_URI);
        console.log("Connected to DB");

    } catch(error) {
        console.log("Error connect to DB:", error);
        process.exit(1);

    }
}

export default connectDB;
