"use client";
import { useEffect, useTransition, useCallback, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
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
import { getInitials } from "../../../lib/utils";
import { setAuthSlice } from "../../store/reducer/authSlice";

import { useAppSelector, useAppDispatch } from "../../store";

const HeaderSearch = dynamic(() => import('../../component/headerSearch'), {
    ssr: false,
})

const Header = ({ locale }) => {
    const dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();
    const [initMenuSticky, setInitMenuSticky] = useState(true);
    const [menuSticky, setMenuSticky] = useState(false)
    const [y, setY] = useState(0);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const getInfoUser = useAppSelector((state) => state.authUserStorage.authInfoUser);
    // const t = useTranslations("userLogins");
    const router = useRouter();
    const localActive = useLocale();
    const pathname = usePathname();
    const isHome = pathname === `/${localActive}` || pathname === `/${localActive}/`;
    const t = useTranslations("Global");

    const onSelectChange = (e) => {
        const nextLocale = e.target.value;
        startTransition(() => {
            router.replace(`/${nextLocale}`);
        });
    };

    const logoutUser = () => {
        dispatch(setAuthSlice({ ...getToken, access_token: null, expires_at: null }))
        router.push('/');
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

    return (
        <div className={`z-50 w-full border border-b border-[#e3e6ef] transform ${initMenuSticky ? 'menu-inisticky' : menuSticky ? 'menu-sticky' : 'menu-unsticky'} top-0`}>
            <div className="screen-layer">
                <div className="header px-[24px] 3xl:px-0">
                    <Link href={`/${locale}/`} className="header-logo">
                        <span className={`text-[20px] lg:text-[28px] xl:text-[40px] select-none font-league_spartan font-[700] outline-0`}>Maxibook.</span>
                    </Link>
                    {
                        !isHome && <HeaderSearch />
                    }
                    <div className="header-login">
                        <label className='label'>
                            <p className='sr-only'>{t('Change Language')}</p>
                            <select
                                defaultValue={localActive}
                                className='bg-transparent py-2'
                                onChange={onSelectChange}
                                disabled={isPending}
                            >
                                <option value='en'>EN</option>
                                <option value='id'>ID</option>
                            </select>
                        </label>
                        {
                            getToken.access_token == '' || getToken.access_token == null ?
                                <Link href={"/login"} className="btn-primary text-[18px] w-[84px] h-[40px]">Sign In <div className="animation"></div></Link> :
                                <>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar className="cursor-pointer">
                                                <AvatarImage src={`${getInfoUser && getInfoUser.avatar ? getInfoUser.avatar.url : "https://github.com/shadcn.png"}`} />
                                                <AvatarFallback>{getInitials(getInfoUser && getInfoUser.name)}</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push(`/${localActive}/user/profile`, undefined, { shallow: true })}>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>{t('Profile')}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push(`/${localActive}/user/saved`, undefined, { shallow: true })}>
                                                    <Bookmark className="mr-2 h-4 w-4" />
                                                    <span>{t('Saved')}</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push(`/${localActive}/user/upload-document`, undefined, { shallow: true })}>
                                                    <CloudUpload className="mr-2 h-4 w-4" />
                                                    <span>{t('Upload')}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => router.push(`/${localActive}/user/document-own`, undefined, { shallow: true })}>
                                                    <FileInput className="mr-2 h-4 w-4" />
                                                    <span>{t('List Document Uploads')}</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className={"cursor-pointer"} onClick={() => logoutUser()}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>{t('Log out')}</span>
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