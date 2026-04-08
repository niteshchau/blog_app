"use client"
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button"
import { Github } from 'lucide-react';


export const AuthButton = () => {

    const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "github"
    })
}


    return(
        <div className="">
            <Button onClick={signIn} className="gap-4 w-full flex justify-center">
                <Github /> Signup With Github
            </Button>
        </div>
    )
}