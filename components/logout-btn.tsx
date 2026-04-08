'use client'
import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button"
import { useRouter } from 'next/navigation'


export const LogoutButton = () => {

    const router = useRouter();

    const logout = async (e : any) => {
        
        await authClient.signOut();
        router.refresh();
        router.push("/");
    }

    return(
        <Button onClick={logout} className="bg-red-500 hover:bg-red-600">Logout</Button>

    )
}