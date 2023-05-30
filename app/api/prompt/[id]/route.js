import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt"

// GET
export const GET = async(request, {params}) => {
    try{
        await connectToDB()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if(!prompt)
            return new Response("Prompt not found!", {status: 404})
        return new Response(JSON.stringify(prompt), {status: 200})
    }catch(err){
        return new Response(JSON.stringify(err.message), {status: 500})
    }
}
// PATCH
export const PATCH = async(request, {params}) => {
    try{
        await connectToDB()
        const { prompt, tag } = await request.json()
        const existingPrompt = await Prompt.findById(params.id)
        if(!existingPrompt)
            return new Response("Prompt Not Found!", {status: 404})
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        existingPrompt.save()
        return new Response(JSON.stringify(prompt), {status: 200})
    }catch(err){
        return new Response(JSON.stringify(err.message), {status: 500})
    }
}

// DELETE
export const DELETE = async(request, {params}) => {
    try{
        await connectToDB()
        await Prompt.findByIdAndDelete(params.id)
        return new Response(JSON.stringify("Prompt Deleted Successfully"), {status: 200})
    }catch(err){
        return new Response(JSON.stringify(err.message), {status: 500})
    }
}