"use client"
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/store";
import { setTabFormatDocument } from "@/store/reducer/categoryFilterSlice";

const HomeSearch = ({ isHome }) => {
    const dispatch = useAppDispatch();
    const [inputSearch, setInputSearch] = useState('');
    const hasFetchedData = useRef(false);
    const searchParams = useSearchParams();
    const search = searchParams.get('query');
    const t = useTranslations('Homepage');
    const router = useRouter();
    const locale = useLocale();

    const handleKeypress = (e) => {
        if(e.key === 'Enter') {
            router.push(`/${locale}/result?query=${inputSearch}`);
        }
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
            setInputSearch(search);
            hasFetchedData.current = true;
            dispatch(setTabFormatDocument(0))
        }
    })

    return (
        <>
            <div className='form-search'>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" onKeyDown={handleKeypress} onChange={(e) => setInputSearch(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !rounded-[999px]" placeholder={t("search anything")} required />
                    <button type="button" onClick={() => {
                        router.push(`/${locale}/result?query=${inputSearch}`);
                        if(!isHome) {
                            setTimeout(() => {
                                window.location.reload();
                            },800)
                        }
                        
                    }} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[999px] text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{t("search button")}</button>
                </div>
            </div>
        </>);
}

export default HomeSearch;