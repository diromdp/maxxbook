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
import { useMapContext } from "../../(dash)/admin/adminContex";
import Cookies from 'universal-cookie';
import { useCookies } from "react-cookie";
import { getInitials } from "../../../lib/utils";


const HeaderContent = () => {
    const { profile } = useMapContext();
    const [cookies, removeCookie] = useCookies(["token"])
    const router = useRouter(); 
    const cookiesUniversal = new Cookies();

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
                    cookiesUniversal.remove("token", {path: "/"})  
                    router.push('/login-admin');
                })
                .catch(function (error) {
                    console.log(error);  
                    cookiesUniversal.remove("token", {path: "/"})  
                    router.push('/login-admin');

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
                        <AvatarImage src={`${profile.avatar ? profile.avatar.url :"https://github.com/shadcn.png"}`} />
                        <AvatarFallback>{getInitials(profile.name)}</AvatarFallback>
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