"use client";
import { useEffect, useTransition, useCallback, useState, useRef } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LogOut,
    FileInput,
    User,
    CloudUpload,
    Bookmark,
} from "lucide-react";
import { urlAPI } from "../../../lib/constant";
import { getInitials } from "../../../lib/utils";
import { setAuthInfoSlice } from "../../store/reducer/authSlice";

import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store";

const Header = ({ locale }) => {
    const dispath = useAppDispatch();
    const [isPending, startTransition] = useTransition();
    const [initMenuSticky, setInitMenuSticky] = useState(true);
    const [menuSticky, setMenuSticky] = useState(false)
    const [userCurrent, setUserCurrent] = useState();
    const [y, setY] = useState(0);
    const hasFetchedData = useRef(false);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const t = useTranslations("userLogins");
    const router = useRouter();
    const localActive = useLocale();

    const onSelectChange = (e) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };

    const getCurrentUser = async () => {
        const token = getToken.access_token;
        if (token) {
                await axios.get(`${urlAPI}backend/customer/user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        setUserCurrent(data.data);
                        dispath(setAuthInfoSlice(data.data));
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }

    }

    const handleNavigation = useCallback((e) => {
        const window = e.currentTarget;
        if (y >= window.scrollY) {
            if (y < 30) {
                setInitMenuSticky(true)
            } else {
                setMenuSticky(true)
                setInitMenuSticky(false)
            }
        } else if (y <= window.scrollY) {

            setMenuSticky(false)
            setInitMenuSticky(false)
        }

        setY(window.scrollY);
    },
        [y]
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            setY(window.scrollY);
            window.addEventListener("scroll", handleNavigation);
            return () => {
                window.removeEventListener("scroll", handleNavigation);
            }
        };
    }, [handleNavigation]);

    useEffect(() => {
        if (!hasFetchedData.current) {
            getCurrentUser();
            hasFetchedData.current = true;
        }
    }, []);

    return (
        <div className={`z-50 w-full border border-b border-[#e3e6ef] transform ${initMenuSticky ? 'menu-inisticky' : menuSticky ? 'menu-sticky' : 'menu-unsticky'} top-0`}>
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="header">
                    <Link href={`/${locale}/`} className="header-logo">
                        <span className={`text-[20px] lg:text-[28px] xl:text-[40px] select-none font-montserrat font-[700] outline-0`}>Maxibook.</span>
                    </Link>
                    <div className="header-login">
                        <label className='label'>
                            <p className='sr-only'>Change Language</p>
                            <select
                                defaultValue={localActive}
                                className='bg-transparent py-2'
                                onChange={onSelectChange}
                                disabled={isPending}
                            >
                                <option value='en'>English</option>
                                <option value='id'>Indonesian</option>
                            </select>
                        </label>
                        {
                            getToken.access_token == '' || getToken.access_token == null ?
                                <Link href={"/login"} className="btn-primary text-[18px] h-[40px]">Login <div className="animation"></div></Link> :
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={`${userCurrent && userCurrent.avatar ? userCurrent.avatar.url : "https://github.com/shadcn.png"}`} />
                                                <AvatarFallback>{getInitials(userCurrent && userCurrent.name)}</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push(`/${localActive}/user/profile`, undefined, { shallow: true })}>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className={"cursor-pointer"}>
                                                    <Bookmark className="mr-2 h-4 w-4" />
                                                    <span>Saved</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push(`/${localActive}/user/upload-document`, undefined, { shallow: true })}>
                                                    <CloudUpload className="mr-2 h-4 w-4" />
                                                    <span>Upload</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className={"cursor-pointer"}>
                                                    <FileInput className="mr-2 h-4 w-4" />
                                                    <span>List Document Uploads</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className={"cursor-pointer"}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;