"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { urlAPI } from "@/lib/constant";


const ListDataDetailDocument = () => {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const locale = useLocale();
    const t = useTranslations("Documents");

    const getData = async () => {
        await axios.get(`${urlAPI}backend/documents?perPage=10&is_random=1&sortBy=title&sortDirection=asc`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    let filtereData = data.data.data;
                    setDataList(filtereData);
                    setIsLoading(false);
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

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {

                isLoading ?
                    <>{
                        [...Array(10)].map((item, index) => {
                            return (
                                <div key={index} className="item-content">
                                    <div className="img">
                                        <Skeleton className=" w-[143px] h-[170px] rounded-[16px]" />
                                    </div>
                                    <div className="description">
                                        <div className="type-totals">
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                        <div className="title-document space-y-4">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-full" />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }</> : <>
                        {
                            dataList && dataList.map((item, index) => {
                                return (
                                    <Link key={index} href={`/${locale}/document/${item.slug}`} target="_blank" className="item-content">
                                        <div className="img">
                                            <Image alt={item.slug} fill priority src={item.thumb_url ? item.thumb_url : 'https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1'} />
                                        </div>
                                        <div className="description">
                                            <div className="type-totals">
                                                <span className="title">{t('title')}</span>
                                                <span className="separator">.</span>
                                                <span className="title">{item && item.page_count ? item.page_count : 0} {t('pages')}</span>
                                            </div>
                                            <div className="title-document">
                                                <h4>{item.title}</h4>
                                                <span className="people-name">{item.user && item.user.name ? item.user.name : 'Admin'}</span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </>
            }
        </>
    );
}

export default ListDataDetailDocument;