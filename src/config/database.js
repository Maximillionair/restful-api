const mongoose = require("mongoose");
require('dotenv').config();

exports.connect = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        console.log("Connecting to MongoDB...");
        await mongoose.connect(uri);
        console.log("Connected to MongoDB successfully.");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1);
    }
};
