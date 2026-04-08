'use client'
import { AuthButton } from "@/components/Authbutton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useState } from "react"

export default function Signin() {
    const [email , setEmail ] = useState("");
    const [password , setPassword ] = useState("");
    const [loading , setLoading] = useState(false);
    const [error , setError ] = useState<string | null>(null);
    const [success , setSuccess] = useState(false);

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          setLoading(false);
          setSuccess(true);
          setTimeout(() => {
            window.location.href = '/blog';
          }, 1000);
        },
        onError: (ctx) => {
          setLoading(false);

            switch (ctx.error.code) {
                case "USER_NOT_FOUND":
                    setError("No account found with this email");
                    break;

                case "INVALID_PASSWORD":
                    setError("Incorrect password");
                    break;

                case "EMAIL_PASSWORD_DISABLED":
                    setError("Email/password login is disabled");
                    break;

                default:
                    setError(ctx.error.message || "Something went wrong");
            }
        },
      }
    );
  };


    return(
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/">
                        <h1 className="text-4xl font-bold bg-linear-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent mb-4">
                            Blogify
                        </h1>
                    </Link>
                    <p className="text-muted-foreground">Welcome back to your creative space</p>
                </div>

                
                <div className="bg-card border-2 border-border rounded-3xl shadow-2xl p-8 hover:border-purple-500/30 transition-all">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-center mb-2">Create an account</h2>
                        <p className="text-center text-muted-foreground text-sm">
                            Enter your email below to create your account
                        </p>
                    </div>

                    
                    <div className="space-y-4 mb-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                                Email
                            </label>
                            <Input
                                onChange={ (e) => {
                                    setEmail(e.target.value);
                                }} 
                                type="email" 
                                placeholder="name@example.com" 
                                className="h-12 border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">
                                Password
                            </label>
                            <Input 
                                onChange={ (e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password" 
                                placeholder="Password (min 8 characters)" 
                                className="h-12 border-2 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}
                    <Button onClick={handleSubmit} className="w-full h-12 bg-linear-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all mb-6">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                            
                            Signing In...
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            </span>
                        ) : success ? (
                            'Success!'
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                    

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="grow border-t border-border"></div>
                        <span className="mx-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Or continue with
                        </span>
                        <div className="grow border-t border-border"></div>
                    </div>

                    {/* Social Auth */}
                    <AuthButton />

                    {/* Footer Links */}
                    <div className="mt-6 text-center text-sm">
                        <p className="text-muted-foreground">
                            Don't have an account?{" "}
                            <Link href="/signup" className="font-semibold text-purple-600 hover:text-purple-700 hover:underline transition-colors">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Terms */}
                <p className="text-center text-xs text-muted-foreground mt-6 px-8">
                    By clicking continue, you agree to our{" "}
                    <Link href="/terms" className="underline hover:text-foreground transition-colors">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="underline hover:text-foreground transition-colors">
                        Privacy Policy
                    </Link>
                    .
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500 rounded-full opacity-10 blur-3xl -z-10"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-600 rounded-full opacity-10 blur-3xl -z-10"></div>
            </div>
        </div>
    )
}