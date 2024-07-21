"use client";
import axios from "axios";
import { useTranslations } from 'next-intl';
import Lottie from 'react-lottie';
import { useState, useEffect, useRef } from "react";
import Card from "@/app/component/cartItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import CardLoading from "@/app/component/cardLoading";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";
import { urlAPI } from "../../../lib/constant";
import * as searchNotFound from '../../../lottie/search-not-found.json';
import { setCategoryFilterState, setPaginationState, setDocumentdata, setDocumentConfig, setEmpatyState } from "../../store/reducer/categoryFilterSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const ResultShow = ({ QureyParams }) => {
    const dispatch = useAppDispatch();
    const categoryFilterState = useAppSelector((state) => state.documents.categoryFilterState);
    const dataPaginationState = useAppSelector((state) => state.documents.documentPagination);
    const documentConfig = useAppSelector((state) => state.documents.documentConfig);
    const dataDocument = useAppSelector((state) => state.documents.documentData);
    const empatyState = useAppSelector((state) => state.documents.empatyState);
    const [isLoading, setLoading] = useState(true);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: searchNotFound,
    };
    const t = useTranslations('Documents');
    const t2 = useTranslations('Global');
    const hasFetchedData = useRef(false);

    const getDocument = async (categroy_id, query) => {
        if (categoryFilterState && categoryFilterState.category_id == '') {
            dispatch(setCategoryFilterState({ ...categoryFilterState, category_id: categroy_id ? categroy_id : '', q: query ?? '' }));
        }

        await setTimeout(() => {
            axios.get(`${urlAPI}backend/documents?q=${query ?? ''}&cursor=${categoryFilterState.cursor ?? ''}&perPage=${5}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${categroy_id ?? ''}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        const checkLength = data.data.data.length;
                        const config = data.data;

                        setLoading(false)
                        dispatch(setDocumentdata(data.data.data))
                        dispatch(setPaginationState(data.data.links))
                        dispatch(setDocumentConfig(config));

                        if (checkLength > 0) {
                            dispatch(setEmpatyState(false))
                        } else {
                            dispatch(setEmpatyState(true))
                        }
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
        }, 100);
    }

    const updatePagination = async (val) => {
        var url_string = val;

        if (url_string) {
            var url = new URL(url_string);
            var page = url.searchParams.get("page");

            dispatch(setCategoryFilterState({ ...categoryFilterState, page: page }));

            await axios.get(`${urlAPI}backend/documents?q=${categoryFilterState && categoryFilterState.q ? categoryFilterState.q : ''}&page=${page}&cursor=${categoryFilterState && categoryFilterState.cursor ? categoryFilterState.cursor : ''}&perPage=${5}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${categoryFilterState && categoryFilterState.category_id ? categoryFilterState.category_id : ''}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        setLoading(false)
                        dispatch(setDocumentdata(data.data.data))
                        dispatch(setPaginationState(data.data.links))
                        dispatch(setDocumentConfig(data.data));
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
                });
        }
    }

    useEffect(() => {
        if (!hasFetchedData.current) {
            dispatch(setCategoryFilterState({ ...categoryFilterState, q: QureyParams != '' ? QureyParams : '' }));
            getDocument('', QureyParams ?? '');
            hasFetchedData.current = true;
        }
    }, []);


    console.log(dataPaginationState && dataPaginationState)

    return (
        <>
            <div className="screen-layer">

                {
                    empatyState &&
                    <div className="content-empty w-full h-full  m-auto">
                        <h1 className="text-[24px] lg:text-[38px] font-bold">{t2('Documents Not Found')}</h1>
                        <div className="lg:w-[400px] lg:h-[400px]">
                            <Lottie options={defaultOptions}
                                className="lottie-container "
                                disabled={true}
                            />
                        </div>
                    </div>
                }
                {
                    !empatyState &&
                    <div className="result-show px-[24px] 3xl:px-0">
                        {
                            !isLoading ? dataDocument && dataDocument.map((item, index) => {
                                if (item.slug) {
                                    return (
                                        <Card
                                            key={index}
                                            colorImage={item.color}
                                            imagePath={item.thumb_url}
                                            title={item.title}
                                            description={item.description}
                                            slug={`${item.slug}`} />
                                    )
                                }

                            }) :
                                <>
                                    {[...Array(12)].map((x, i) =>
                                        <CardLoading key={i} />
                                    )}
                                </>
                        }

                    </div>
                }
                {
                    !empatyState &&
                    <div className="mt-[32px] flex justify-between">
                        <Pagination>
                            <PaginationContent>
                                {
                                    dataPaginationState && dataPaginationState.map((data, index) => {
                                        if (data.label === "&laquo; Previous") {
                                            return (
                                                <>
                                                    {
                                                        <PaginationItem key={index}>
                                                            <div disabled={data.url != null ? false : true} className={data.url != null ? "cursor-pointer" : 'pointer-events-none opacity-50'} onClick={() => updatePagination(data.url)}>
                                                                <FaAngleLeft />
                                                            </div>
                                                        </PaginationItem>
                                                    }
                                                </>
                                            )
                                        } else if (data.label === "Next &raquo;") {
                                            return (
                                                <>
                                                    {
                                                        <PaginationItem key={index}>
                                                            <div disabled={data.url != null ? false : true} className={data.url != null ? "cursor-pointer" : 'pointer-events-none opacity-50'} onClick={() => updatePagination(data.url)}>
                                                                <FaAngleRight />
                                                            </div>
                                                        </PaginationItem>
                                                    }
                                                </>
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
                }
            </div>
        </>

    );
}

export default ResultShow;