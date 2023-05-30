"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Profile from '@components/Profile'

const MyProfile = () => {
    const {data: session} = useSession()
    console.log(session)
    const [posts, setPosts] = useState([])
    const router = useRouter()

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async(post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
        if(hasConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE"
                })
                const filteredPosts = posts.filter((p) => p._id !== post._id)
                setPosts(filteredPosts)
            }catch(error){
                console.log(error)
            }
        }
    }
    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user?.id}/posts`)
        const data = await response.json()
        setPosts(data)
    }
    console.log("Posts:", posts)

    useEffect(() => {
        if(session?.user?.id){
            console.log("fetching...")
            fetchPosts()
        }
    }, [session?.user?.id])

    return (
        <Profile
            name="My"
            desc=""
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default MyProfile