import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import prisma from "@/lib/db"
import { AvatarImage } from "@radix-ui/react-avatar"
import { notFound } from "next/navigation"
import Link from "next/link"

type BlogPageProps = {
  params: {
    slug: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      user: true,
    },
  })
  
  if (!blog) {
    notFound()
  }

  const readingTime = Math.ceil(blog.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 mb-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all stories
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-6 space-y-8">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
          {blog.title}
        </h1>

        {/* Author Info & Meta */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b-2 border-linear-to-r from-pink-500/20 to-purple-600/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 ring-2 ring-purple-500/30">
              <AvatarImage src={blog.user.image as string} alt={blog.user.name || "Author"} />
              <AvatarFallback className="bg-linear-to-br from-pink-500 to-purple-600 text-white font-semibold">
                {blog.user.name?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-lg">
                {blog.user.name || 'Anonymous'}
              </span>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {blog.createdAt.toDateString().split(' ').slice(1).join(' ')}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-slate max-w-none 
          prose-headings:bg-linear-to-r prose-headings:from-pink-500 prose-headings:to-purple-600 prose-headings:bg-clip-text prose-headings:text-transparent
          prose-a:text-purple-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-code:text-pink-600 prose-code:bg-pink-50 dark:prose-code:bg-pink-950/30 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
          prose-pre:bg-slate-900 prose-pre:text-slate-100
          prose-blockquote:border-l-purple-500 prose-blockquote:text-muted-foreground
          prose-img:rounded-xl prose-img:shadow-lg
          leading-relaxed">
          {blog.content}
        </div>

        {/* Footer Actions */}
        <div className="pt-8 border-t flex flex-wrap gap-4 items-center justify-between">
          
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 bg-linear-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Read More Stories
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    </div>
  )
}