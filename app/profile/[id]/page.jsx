"use client"

import { useEffect, useState } from "react"

import Profile from '@components/Profile'

const PublicProfile = ({params}) => {
    const [posts, setPosts] = useState([])
    const [profileId, setProfileId] = useState({})
    console.log("Id::",params.id)
    console.log("Profile:", profileId)

    const fetchProfile = async () => {
        const response = await fetch(`/api/users/${params.id}/profile`)
        const profileData = await response.json()
        setProfileId(profileData)
    }

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params.id}/posts`)
        const data = await response.json()
        setPosts(data)
    }

    useEffect(() => {
        if(params.id){
            console.log("fetching...")
            fetchProfile()
            fetchPosts()
            console.log("Posts:", posts)
        }
    }, [])

    return (
        <Profile
            name={profileId?.username || " "}
            desc=""
            data={posts}
        />
    )
}
export default PublicProfile