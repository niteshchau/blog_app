'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pen, Save, FileText, Sparkles } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { nanoid } from "nanoid";
import { DialogDemo } from '@/components/SignInModal';

export default function WriteStory() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [open , setOpen] = useState(false);
    
    const router = useRouter();
    const  {data , error} = useSession();

    useEffect( () => {
        if(!data) {
            setOpen(true);
        }
    } , [data]);

    if(!data) {
        return <DialogDemo open={open} onOpenChange={setOpen} />;
    }


    const handleContentChange = (e: any) => {
        const text = e.target.value;
        setContent(text);
        const words = text.trim().split(/\s+/).filter((word : string) => word.length > 0);
        setWordCount(words.length);
    };

    const blogHandler = async () => {
        if (title.length === 0 || content.length === 0) return;

        setIsSaving(true);
        try {
            const baseSlug = slugify(title, { lower: true, strict: true });
            const slug = `${baseSlug}-${nanoid(6)}`;

            const result = await axios.post(`/api/blog`, { 
                title, 
                content, 
                slug, 
                id: data?.user.id 
            });

            console.log("response:", result.data);
            router.push('/blog');
        } catch (error) {
            console.error("Error saving blog:", error);
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-linear-to-br from-pink-500 to-purple-600 rounded-2xl shadow-lg">
                            <Pen className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
                                Write Your Story
                            </h1>
                            <p className="text-muted-foreground">Share your thoughts with the world</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={blogHandler}
                        disabled={isSaving || !title || !content}
                        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 font-semibold"
                    >
                        <Save className="w-5 h-5" />
                        <span>{isSaving ? 'Publishing...' : 'Publish'}</span>
                    </button>
                </div>

                {/* Editor Card */}
                <div className="bg-card rounded-3xl shadow-2xl overflow-hidden border-2 border-purple-500/20 hover:border-purple-500/40 transition-all">
                    {/* Title Input */}
                    <div className="border-b border-border bg-linear-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20">
                        <input 
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-8 py-6 text-4xl font-bold text-foreground placeholder-muted-foreground bg-transparent border-none outline-none focus:ring-0"
                            placeholder="Your amazing title..."
                        />
                    </div>
                    
                    {/* Content Textarea */}
                    <div className="relative bg-card">
                        <textarea
                            value={content}
                            onChange={handleContentChange}
                            className="w-full px-8 py-6 text-lg text-foreground placeholder-muted-foreground bg-transparent border-none outline-none focus:ring-0 resize-none leading-relaxed"
                            placeholder="Start writing your story... Let your creativity flow freely."
                            rows={20}
                            style={{ minHeight: '600px' }}
                        />
                        
                        {/* Decorative linear overlay */}
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-card to-transparent pointer-events-none"></div>
                    </div>

                    {/* Footer Stats */}
                    <div className="px-8 py-5 bg-linear-to-r from-pink-50/50 to-purple-50/50 dark:from-pink-950/20 dark:to-purple-950/20 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 text-sm">
                                <FileText className="w-4 h-4 text-purple-500" />
                                <span className="font-semibold text-foreground">{wordCount}</span>
                                <span className="text-muted-foreground">words</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{content.length} characters</span>
                            </div>
                            {wordCount > 0 && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>~{Math.ceil(wordCount / 200)} min read</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Progress indicator */}
                        {wordCount > 0 && (
                            <div className="flex items-center gap-2">
                                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-linear-to-r from-pink-500 to-purple-600 transition-all duration-300"
                                        style={{ width: `${Math.min((wordCount / 500) * 100, 100)}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                    {wordCount < 500 ? 'Keep going!' : 'Great length!'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-card border-2 border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all">
                        <div className="p-2 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg mt-0.5">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground mb-1">Writing Tip</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Don't worry about perfection on your first draft. Let the words flow freely, and refine them later.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-card border-2 border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all">
                        <div className="p-2 bg-linear-to-br from-pink-500 to-purple-600 rounded-lg mt-0.5">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="font-semibold text-foreground mb-1">Formatting</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Use clear paragraphs and headings to make your story easy to read and engaging.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border-2 border-border hover:border-purple-500/50 rounded-full transition-all">
                        Save as Draft
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border-2 border-border hover:border-purple-500/50 rounded-full transition-all">
                        Preview
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border-2 border-border hover:border-purple-500/50 rounded-full transition-all">
                        Add Tags
                    </button>
                </div>
            </div>
        </div>
    )
}