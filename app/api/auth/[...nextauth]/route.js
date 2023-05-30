import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import User from '@models/user'
import { connectToDB } from "@utils/database";

// console.log({
//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// })
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            // console.log(sessionUser)
            session.user.id = sessionUser._id.toString()
            return session    
        },
        async signIn({ profile }) {
            try{
                const isDBConnected = await connectToDB()
                // check if user already exists
                if(isDBConnected){
                    const userExists = await User.findOne({
                        email: profile.email
                    })
                    // if not, create new user
                    if(!userExists){
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture
                        })
                    }
                    console.log("UserExists:", userExists)
                    return true
                }else{
                    console.log("DB not connected")
                    return false
                }
                
            }catch (error) {
                console.log(error)
                return false
            }
        }
    }
})

export { handler as GET, handler as POST};