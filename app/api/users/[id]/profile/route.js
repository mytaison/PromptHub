import { connectToDB } from "@utils/database"
import User from "@models/user"
import { ObjectId } from "mongodb"

export const GET = async(request, {params}) => {
    try{
        await connectToDB()
        const profileId = params.id
        const profile = await User.findById(profileId)
        return new Response(JSON.stringify(profile), {status: 200})
    }catch(err){
        return new Response(JSON.stringify(err.message), {status: 500})
    }
}