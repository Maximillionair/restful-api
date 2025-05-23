const mongoose = require("mongoose");

exports.connect = async ()=> {
    console.log(process.env.NIGGA)

    try{
        await mongoose.connect(process.env.MONGODB_URI);
    } catch {
        console.log("not connected");
        process.exit(1);
    }
}