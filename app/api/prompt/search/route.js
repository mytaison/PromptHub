import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async(request) => {
    try{
        await connectToDB()
        const { searchTerm } = await request.json()
        console.log(searchTerm)
        const searchRegex = `${searchTerm}`
        const searchRegexOptions = "i" // case-insensitive
        let prompts = await Prompt.find({
            $or: [
                {prompt: { $regex: searchRegex, $options: searchRegexOptions }},
                {tag: { $regex: searchRegex, $options: searchRegexOptions }},
            ]
        }).populate('creator')
        console.log((prompts))
        if(prompts.length === 0){
            prompts = await Prompt.find({}).populate({
                path: 'creator',
                match: { username: { $regex : searchRegex, $options: searchRegexOptions }}
            })
        }
        console.log((prompts))
        return new Response(JSON.stringify(prompts), {status: 200})
    }catch(err){
        return new Response(JSON.stringify(err.message), {status: 500})
    }
}