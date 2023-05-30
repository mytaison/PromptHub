import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const POST = async(req, res) => {
    const {userId, prompt, tag} = await req.json()
    try{
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            tag: tag,
            prompt: prompt
        })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})
    }catch(error){
        console.log(error)
        return new Response(JSON.stringify({message: "Failed to create prompt.", error: error.message}, {status: 500}))
    }
}