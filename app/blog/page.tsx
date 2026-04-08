import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card"
import prisma from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation";

export default async function Blog() {

    const Blogs = await prisma.blog.findMany({
        select : {
            user : true,
            id : true,
            slug : true,
            title : true,
            content : true,
            createdAt : true
        }
    });

    if(!Blogs) {
        notFound();
    }

    return(
        <div className="min-h-screen bg-background pt-24 pb-12">
            {/* Hero Section */}
            <div className="max-w-4xl mx-auto px-6 mb-12">
                <h1 className="text-5xl font-bold mb-4 bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                    Explore Stories
                </h1>
                <p className="text-lg text-muted-foreground">
                    Discover amazing articles from our community of writers
                </p>
            </div>

            {/* Blog Cards */}
            <div className="max-w-4xl mx-auto px-6">
                <div className="flex flex-col gap-6">
                    {
                        Blogs.map( (b) => (
                           <Link href={`/blog/${b.slug}`} key={b.id} className="block group">
                                <Card className="p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-purple-500/50 hover:-translate-y-1 border-2">
                                    <h2 className="text-2xl font-bold mb-3 group-hover:bg-linear-to-r group-hover:from-pink-500 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                                        {b.title}
                                    </h2>
                                    <p className="mb-4 text-muted-foreground leading-relaxed line-clamp-2">
                                        {b.content.split(' ').slice(0, 30).join(' ')}...
                                    </p>

                                    <div className="flex items-center gap-3 text-sm">
                                        <Avatar className="w-8 h-8 ring-2 ring-purple-500/20">
                                            <AvatarImage src={b.user.image as string} alt={b.user.name || "User"} />
                                            <AvatarFallback className="bg-linear-to-br from-pink-500 to-purple-600 text-white text-xs">
                                                {b.user.name?.[0]?.toUpperCase() || 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground">
                                                {b.user.name || 'Anonymous'}
                                            </span>
                                            <span className="text-muted-foreground text-xs">
                                                {(b.createdAt).toDateString().split(' ').slice(1).join(' ')}
                                            </span>
                                        </div>
                                        
                                        {/* Reading time estimate */}
                                        <span className="ml-auto text-muted-foreground text-xs flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {Math.ceil(b.content.split(' ').length / 200)} min read
                                        </span>
                                    </div>
                                </Card>
                           </Link>
                        ))
                    }
                </div>
            </div>

            {/* Empty State */}
            {Blogs.length === 0 && (
                <div className="max-w-4xl mx-auto px-6 text-center py-20">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-linear-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">No stories yet</h3>
                    <p className="text-muted-foreground mb-6">Be the first to share your story with the community</p>
                    <Link 
                        href="/new-story" 
                        className="inline-flex items-center gap-2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Start Writing
                    </Link>
                </div>
            )}
        </div>
    )
}

export const dynamic = 'force-dynamic'