"use client"
import { Suspense } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useTranslations, useLocale } from 'next-intl';
import { urlAPI } from "@/lib/constant";
import { Skeleton } from "@/components/ui/skeleton"

export default async function Categories() {
    const t = useTranslations('Homepage');
    const [categoryData, setCategoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const localData = useLocale();
    const hasFetchedData = useRef(false);

    const getCategory = async () => {
        axios.get(`${urlAPI}backend/categories/home`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIsLoading(false);
                    setCategoryData(data.data);
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
    };


    useEffect(() => {
        if (!hasFetchedData.current) {
            getCategory();
            hasFetchedData.current = true;
        }
    }, []);
    return (
        <div className="categories">
            <div className="container m-auto">
                <div className="content">
                    <Suspense fallback={<></>}>
                    {
                        isLoading ?
                            <>
                                {[...Array(4)].map((x, i) =>
                                    <div key={i} className="item">
                                        <Skeleton className="h-4 w-[120px]" />
                                        <Skeleton className="h-[96px] w-[96px] image" />
                                    </div>
                                )}
                            </> :
                            <>
                                {
                                    categoryData && categoryData.length > 0 && categoryData.map((item, index) => {
                                        return (
                                            <Link prefetch={false} key={index} href={`/${localData}/catagories/${item.slug}`} className="item">
                                                <span>{localData == 'en' ? item.name : item.name_id}</span>
                                                <Image priority alt={item.name ? item.name : ''} className="image" width={96} height={96} src={item.icon_url ? item.icon_url : ''} />
                                            </Link>
                                        )
                                    })
                                }
                            </>
                    }
                    </Suspense>
                </div>
                <div className="see-more">
                    <Link prefetch={false} href={`/${localData}/catagories`}>{t('see category')}</Link>
                </div>
            </div>
        </div>
    );
}
