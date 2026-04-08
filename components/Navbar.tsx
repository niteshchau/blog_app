'use client'

import { authClient, useSession } from "@/lib/auth-client"
import { LogoutButton } from "./logout-btn"
import { SearchBar } from "./search-bar"
import { useState, useEffect } from 'react'
import { MobileMenu } from "./mobile-menu"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"

export const Navbar = () => {
    const { data } = useSession();
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const router = useRouter();

    const logout = async (e : any) => {
        
        await authClient.signOut();
        router.refresh();
        router.push("/");
        setIsLoggedIn(false);
    }
    useEffect( () => {
        if(data) {
            setIsLoggedIn(true);
        }
    } , [data])


    return(
        <nav className={` 
                bg-transparent border-b bg-linear-to-br from-purple-600 via-violet-600 to-indigo-700
        }`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between gap-8">
                    <div className="flex gap-2">
                        <div className="md:hidden flex items-center">
                            <MobileMenu />
                        </div>
                    <a 
                        href="/blog" 
                        className="text-2xl font-bold bg-linear-to-r from-yellow-200 via-pink-200 to-pink-300 bg-clip-text text-transparent hover:scale-105 transition-transform"
                    >
                        Blogify
                    </a>
                    

                    </div>
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8 flex-1 ml-12">
                        <a 
                            href="/" 
                            className="text-white/90 hover:text-white font-medium transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-yellow-200 to-pink-300 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a 
                            href="/blog" 
                            className="text-white/90 hover:text-white font-medium transition-colors relative group"
                        >
                            Blog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-yellow-200 to-pink-300 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a 
                            href="/new-story" 
                            className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors relative group"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Write
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-yellow-200 to-pink-300 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden lg:flex flex-1 max-w-md">
                        <SearchBar />
                    </div>

                    {/* Auth  */}
                    <div className="flex items-center gap-4">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <div className="sm:flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-200 to-pink-300 flex items-center justify-center text-purple-900 font-bold text-sm">
                                        {data?.user?.name?.[0]?.toUpperCase() || 'U'}
                                    </div>

                                </div>
                            <Button onClick={logout} className="bg-red-500 hover:bg-red-600">Logout</Button>


                            </div>
                        ) : (
                            <a 
                                href="/signin" 
                                className="bg-white text-purple-600 px-6 py-2.5 rounded-full font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
                            >
                                Sign In
                            </a>
                        )}
                    </div>

                    
                </div>

                {/* Mobile Search */}
                {/* <div className="lg:hidden mt-4">
                    <SearchBar />
                </div> */}
            </div>
        </nav>
    )
}