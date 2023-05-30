import mongoose from "mongoose";

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log("MongoDB is already connected.")
        return isConnected
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true
        console.log('MongoDB connected.')
        return isConnected
    }catch(error){
        console.log(error)
        return isConnected
    }
}