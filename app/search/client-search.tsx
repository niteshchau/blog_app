"use client"
import { use } from "react";
import { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import axios from 'axios';

type BlogResult = {
        id: string;
        slug: string;
        title: string;
        content: string;
        createdAt: string;
        user: {
        name: string | null;
        image: string | null;
        };
};


export default function ClientSearch({
    searchParams,
} : {
    searchParams : {q ? : string}
}) {

    const [results, setResults] = useState<BlogResult[]>([]);


    const [isSearching, setIsSearching] = useState(false);

    const q = searchParams.q;

    const [searchQuery, setSearchQuery] = useState(q);
    
    useEffect( () => {
        setSearchQuery(q);
    } , [q])

    useEffect( () => {
        if(q) {
            handleSearch(q);
        }
    } , [q])

     const handleSearch = async (query: string) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        setIsSearching(true);

        try {
            const res = await axios(
            `/api/blog/search?q=${encodeURIComponent(searchQuery!)}`
            );
            setResults(res.data);
        } catch (error) {
            console.error(error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
}   ;


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(searchQuery!);
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-6xl mx-auto px-6">
                {/* Search Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                        Discover Stories
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Search through thousands of articles and find what inspires you
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-12">
                    <form onSubmit={handleSubmit} className="relative">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground group-focus-within:text-purple-500 transition-colors" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for articles, topics, or authors..."
                                className="w-full pl-16 pr-14 py-5 text-lg bg-card border-2 border-border rounded-full outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all shadow-lg"
                            />
                        </div>
                    </form>


                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Search Results */}
                        {isSearching ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <Card key={i} className="p-6 animate-pulse">
                                        <div className="h-6 bg-muted rounded w-3/4 mb-3"></div>
                                        <div className="h-4 bg-muted rounded w-full mb-2"></div>
                                        <div className="h-4 bg-muted rounded w-5/6"></div>
                                    </Card>
                                ))}
                            </div>
                        ) : results.length > 0 ? (
                            <div className="space-y-4">
                                {results.map((result) => (
                                    <Link href={`/blog/${result.slug}`} key={result.id} className="block group">
                                        <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1 border-2">
                                            <h3 className="text-2xl font-bold mb-3 group-hover:bg-linear-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                                                {result.title}
                                            </h3>
                                            <p className="text-muted-foreground mb-4 line-clamp-2">
                                                {result.content}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarImage src={result.user.image || ''} />
                                                    <AvatarFallback className="bg-linear-to-br from-pink-500 to-purple-600 text-white text-xs">
                                                        {result.user.name?.[0]?.toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-foreground font-medium">
                                                    {result.user.name}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {new Date(result.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : searchQuery ? (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                    <Search className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">No results found</h3>
                                <p className="text-muted-foreground mb-6">
                                    Try different keywords or browse trending topics
                                </p>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                                    <Search className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Start Searching</h3>
                                <p className="text-muted-foreground">
                                    Enter a keyword to discover amazing stories
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Quick Links */}
                        <Card className="p-6 border-2 border-border hover:border-purple-500/30 transition-all">
                            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                            <div className="space-y-2">
                                <Link href="/blog" className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                                    All Articles
                                </Link>
                                <Link href="/new-story" className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                                    Write a Story
                                </Link>
                                <Link href="/" className="block px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground">
                                    Home
                                </Link>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );

    
}