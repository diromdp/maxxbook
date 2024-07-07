"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Pencil,
    Trash2
} from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/id';
import axios from "axios";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Empty } from 'antd';
import { useRouter } from "next/navigation";
import { urlAPI } from "../../../../../lib/constant";
import { setAuthSlice } from "../../../../store/reducer/authSlice";

import { useAppSelector, useAppDispatch } from "../../../../store";


dayjs.extend(localeData);
dayjs.locale('id');
const DocumentOwn = () => {
    const dispatch = useAppDispatch();
    const [listDocument, setLisDocument] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const hasFetchedData = useRef(false);
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const [filterData, setFilterData] = useState({
        q: "",
        cursor: "",
        perPage: "50",
        sortBy: "title",
        sortDirection: "asc",
    });
    const token = getToken.access_token;
    const locale = useLocale();
    const router = useRouter();

    const logoutUser = () => {
        dispatch(setAuthSlice({ ...getToken, access_token: null, expires_at: null }))
        router.push('/');
    }
    
    const getData = async () => {
        await axios.get(`${urlAPI}backend/customer/documents/own?cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data.data;
                    setLoading(false);
                    setLisDocument(dataJson);
                    setDataPagination(data.data.links)
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 401) {
                        logoutUser();
                    }
                    console.log(error.response.data);
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

    const updatePagination = async (val) => {
        var url_string = val;

        if (url_string) {
            var url = new URL(url_string);
            var page = url.searchParams.get("page");
            setFilterData({ ...filterData, page: page });
            await axios.get(`${urlAPI}backend/customer/documents/own?cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        setLoading(false)
                        setDataFetch(data.data.data)
                        setDataPagination(data.data.links)
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        if(error.response.status === 401) {
                            logoutUser();
                        }
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

    const onDelete = async (id) => {
        await axios.delete(`${urlAPI}backend/customer/documents/${id}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const updateListDocument = listDocument.filter(item => item.id !== id);
                    setLisDocument(updateListDocument);
                }
            })
            .catch(function (error) {
                if (error.response) {
                    if(error.response.status === 401) {
                        logoutUser();
                    }
                    console.log(error.response.data);
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
        if (!hasFetchedData.current) {
            getData();
            hasFetchedData.current = true;
        }
    }, []);

    return (
        <>
            <div className="document-owner">
                <div className="screen-layer">
                    <div className="content-owner">
                        {
                            isLoading ?
                                <>
                                    {Array.from({ length: 12 }).map((_, index) => (
                                        <div key={index} className="item-document">
                                            <div className="left-side">
                                                <Skeleton className="image-placeholder" />
                                                <div className="description">
                                                    <Skeleton className="h-[30px] w-[150px] mb-[16px]" />
                                                    <Skeleton className="h-[100px] w-[360px]" />
                                                </div>
                                            </div>
                                            <div className="right-side">
                                                <Skeleton className="h-[40px] w-[100px]" />

                                            </div>
                                        </div>
                                    ))}
                                </>
                                :
                                <>
                                    {
                                        listDocument.length > 0 ? listDocument.map((item, index) => {
                                            return (
                                                <div className="item-document" key={index}>
                                                    <div className="left-side">
                                                        <Image alt={item.title} width={132} height={174} src={item.thumb_url ? item.thumb_url : "https://imgv2-1-f.scribdassets.com/img/document/698827662/298x396/91da6ea0cc/0?v=1"} />
                                                        <Link href={`/${locale}/document/${item.slug}`} className="description">
                                                            <h3>{item.title}</h3>
                                                            <div className="paragraph" dangerouslySetInnerHTML={{ __html: `${item.description_seo}` }}>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="right-side">
                                                        <div className="content-editor">
                                                            <div className="cursor-pointer" onClick={() => router.push(`/${locale}/user/upload-document/${item.id}`, undefined, { shallow: true })}>
                                                                <Pencil className="cursor-pointer text-slate-600" />
                                                            </div>
                                                            <div onClick={() => onDelete(item.id)} className="cursor-pointer">
                                                                <Trash2 className="cursor-pointer text-red-600" />
                                                            </div>
                                                        </div>
                                                        <div className="desciption">
                                                            <ul>
                                                                <li>
                                                                    <span>
                                                                        Name File: {item.upload.file_name && item.upload.file_name}
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span>
                                                                        Status: 
                                                                        <>
                                                                        {item.approval && item.approval.approval_status == "PENDING" ? <b className="text-red-800">{ item.approval && item.approval.approval_status}</b> : <b className="text-green-800">{item.approval && item.approval.approval_status}</b>}
                                                                        </>
                                                                    </span>
                                                                </li>
                                                                <li>
                                                                    <span>
                                                                        Date: {dayjs(item.upload.created_at).format("D MMMM YYYY")}
                                                                    </span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) :
                                            <Empty className="mt-[120px]" />
                                    }
                                </>
                        }
                    </div>
                    <div className="my-[32px] flex justify-between">
                        <Pagination>
                            <PaginationContent>
                                {
                                    listDocument.length > 0 && dataPagination.map((data, index) => {
                                        if (data.label === "&laquo; Previous") {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationPrevious disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                </PaginationItem>

                                            )
                                        } else if (data.label === "Next &raquo;") {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationNext disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                </PaginationItem>
                                            )
                                        } else {
                                            return (
                                                <PaginationItem key={index}>
                                                    <PaginationLink className="cursor-pointer" data-url={data.url} isActive={data.active} onClick={() => updatePagination(data.url)}>
                                                        {data.label}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )
                                        }
                                    })
                                }
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DocumentOwn;