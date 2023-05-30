'use client'

import { useState, useEffect } from "react"

import PromptCard from './PromptCard'

const PromptCardList = ( { data, handleTagClick} ) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((posts) => (
                <PromptCard
                    key={posts._id}
                    post={posts}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState("")
    const [posts, setPosts] = useState([])
    const [timeoutRef, setTimeoutRef] = useState(null)
    
    function searchOnTextChange(text){
        clearTimeout(timeoutRef)
        setTimeoutRef(
            setTimeout(async() => {
                const response = await fetch('/api/prompt/search', {
                    method: "POST",
                    body: JSON.stringify({
                        searchTerm: text
                    })
                })
                const data = await response.json()
                setPosts(data)
            }, 500)
        )
    }

    const handleSearchChange = (e) => {
        console.log("handleSearchChange",e.target.value)
        setSearchText(e.target.value)
        searchOnTextChange(e.target.value)
    }

    const handleTagClick = (tag) => {
        console.log(tag)
        setSearchText(tag)
        searchOnTextChange(tag)
    } 
    const fetchPosts = async () => {
        const response = await fetch('/api/prompt')
        const data = await response.json()
        setPosts(data)
        console.log("Posts:", posts)

    }


    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <section className="feed">
            <form action="" className="relative w-full flex-center">
                <input 
                    type="text"
                    placeholder="Search for a tag or username" 
                    id="search_box"
                    required 
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search_input peer"
                    />
            </form>
            <PromptCardList
                data={posts}
                handleTagClick={handleTagClick}
            />
        </section>
    )
}

export default Feed