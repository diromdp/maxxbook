"use client"
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";


const HeaderSearch = () => {
    const [inputSearch, setInputSearch] = useState('');
    const hasFetchedData = useRef(false);
    const searchParams = useSearchParams();
    const search = searchParams.get('query');
    const t = useTranslations('Homepage');
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        if (!hasFetchedData.current) {
            setInputSearch(search);
            hasFetchedData.current = true;
        }
    })

    return (
        <>
            <div className='form-search-header w-[50%]'>
                <div className="relative flex items-center justify-center">
                    <input type="search" onChange={(e) => setInputSearch(e.target.value)} id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !rounded-[999px]" placeholder={t("search anything")} required />
                    <div onClick={() => {
                        router.push(`/${locale}/result?query=${inputSearch}`);
                        setTimeout(() => {
                            window.location.reload();
                        },800)
                    }} className="text-gray-500 font-medium rounded-[999px] relative right-[40px] cursor-pointer"><Search /></div>
                </div>
            </div>
        </>);
}

export default HeaderSearch;