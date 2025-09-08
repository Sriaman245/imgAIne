import mongoose from "mongoose";

const connectDB=async ()=>{

    mongoose.connection.on('connected',()=>{
        console.log("Database connected")
    })//when database connected then this function return Database connected

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

export default connectDB