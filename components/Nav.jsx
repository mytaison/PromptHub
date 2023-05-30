// import React from 'react'
"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Nav = () => {
    const {data: session} = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    useEffect(() => {
        const setupProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setupProviders()
    }, [])

    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href="/" className='flex gap-2 flex-center'>
                <Image 
                    src="/assets/images/logo.png"
                    alt="PromptHub Logo"
                    width={40}
                    height={40}
                    className="object-contain"    
                ></Image>
                <p className='logo-text'>PromptHub</p>
            </Link>
            {/* {console.log(providers)} */}
            {/* {window.alert(session?.user)} */}
            {/** Desktop Navigation */}
            <div className='sm:flex hidden'>
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                        <Link href="/profile">
                            <Image 
                                src={session?.user?.image}
                                width={37}
                                height={37}
                                alt="Profile"
                                className="rounded-full"
                                >
                            </Image>
                        </Link>
                    </div>
                    ) : (
                    <>
                        {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                className="black_btn"
                                onClick={ () => signIn(provider.id)}>
                                Sign In
                            </button>
                        ))}
                    </>
                    )
                }
            </div>
            {/** Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {session?.user ? (
                    <div className="flex">
                        <Image 
                            src={session?.user?.image}
                            width={37}
                            height={37}
                            alt="Profile"
                            className="rounded-full"
                            onClick={() => { setToggleDropdown((prev) => !prev) }}
                            >
                        </Image>
                        {toggleDropdown && (
                            <div className='dropdown'>
                                <Link
                                    href="/profile"
                                    className="dropdown-link"
                                    onClick={()=> setToggleDropdown(false)}>
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown-link"
                                    onClick={()=> setToggleDropdown(false)}>
                                    Create Prompt
                                </Link>
                                <button
                                    type="button"
                                    className='mt-5 w-full black_btn'
                                    onClick={() => {
                                        setToggleDropdown(false)
                                        signOut()
                                    }}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {providers && 
                        Object.values(providers).map((provider) => (
                            <button
                                type="button"
                                key={provider.name}
                                className="black_btn"
                                onClick={ () => signIn(provider.id)}>
                                Sign In
                            </button>
                        ))}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav