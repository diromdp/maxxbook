"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { urlAPI } from "../../../lib/constant";

import { useCookies } from "react-cookie"

const HeaderContent = () => {

    const [cookies, removeCookie] = useCookies(["token"])
    const router = useRouter(); 
    const logout =  async() => {
        try {
            const response = await axios.post(`${urlAPI}backend/admin/logout`,{}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    "Authorization": `Bearer ${cookies.token}`
                }
            })
                .then(function (response) {
                    console.log(response);
                    removeCookie('token', { path: '/'});
                    router.push('/login-admin');
                })
                .catch(function (error) {
                    console.log(error);  
                });

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <DropdownMenu className="pr-[32px]">
                <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-46">
                    <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push('/admin/profile')}>Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className={"cursor-pointer"} onClick={() => logout()}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default HeaderContent;