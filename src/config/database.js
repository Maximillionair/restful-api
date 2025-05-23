const mongoose = require("mongoose");
require('dotenv').config();

exports.connect = async ()=> {
    console.log(process.env.NIGGA)

    try{
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
    } catch {
        console.log("not connected");
        process.exit(1);
    }
}