"use client"
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { usePathname } from 'next/navigation';
import { Modal } from 'antd';

const HeaderSearch = () => {
    const [inputSearch, setInputSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasFetchedData = useRef(false);
    const searchParams = useSearchParams();
    const search = searchParams.get('query');
    const t = useTranslations('Homepage');
    const router = useRouter();
    const locale = useLocale();
    const pathname = usePathname();
    const isResult = pathname === `/${locale}/result` || pathname === `/${locale}/result?query`;

    const handleKeypress = (e) => {
        if(e.key === 'Enter') {
            setIsModalOpen(false);
            router.push(`/${locale}/result?query=${inputSearch}`);
            if (isResult) {
                setTimeout(() => {
                    window.location.reload();
                }, 800)
            }
        }
    }
    const handleModalOpen = () => {
        setIsModalOpen(false)
    }
    useEffect(() => {
        if (!hasFetchedData.current) {
            setInputSearch(search);
            hasFetchedData.current = true;
        }
    });

    return (
        <>
            <div className="header-search">
                <div className="cursor-pointer flex flex-end md:hidden" onClick={() => setIsModalOpen(true)}>
                    <Search />
                </div>
                <div className='form-search-header hidden md:flex'>
                    <div className="relative flex items-center justify-center w-full">
                        <input type="text" onKeyDown={handleKeypress} onChange={(e) => setInputSearch(e.target.value)} id="default-search" className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !rounded-[999px]" placeholder={t("search anything")} />
                        <div onClick={() => {
                            router.push(`/${locale}/result?query=${inputSearch}`);
                            if (isResult) {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 800)
                            }
                        }} className="text-gray-500 font-medium rounded-[999px] absolute right-[16px] cursor-pointer"><Search /></div>
                    </div>
                </div>
            </div>
            <Modal title="Search" open={isModalOpen} onOk={handleModalOpen} closable={true}>
                <div className='form-search-header'>
                    <div className="relative flex items-center justify-center">
                        <input type="text" onKeyDown={handleKeypress} onChange={(e) => setInputSearch(e.target.value)} id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 !rounded-[999px]" placeholder={t("search anything")} />
                        <div onClick={() => {
                            router.push(`/${locale}/result?query=${inputSearch}`);
                            if (isResult) {
                                setTimeout(() => {
                                    window.location.reload();
                                }, 800)
                            }
                        }} className="text-gray-500 font-medium rounded-[999px] absolute right-[16px] cursor-pointer"><Search /></div>
                    </div>
                </div>
            </Modal>

        </>);
}

export default HeaderSearch;