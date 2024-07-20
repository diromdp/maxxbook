"use client";
import axios from "axios";
import { useTranslations } from 'next-intl';
import Lottie from 'react-lottie';
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';

import Card from "@/app/component/cartItem";
import CardLoading from "@/app/component/cardLoading";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext
} from "@/components/ui/pagination";
import { urlAPI } from "../../../lib/constant";
import * as searchNotFound from '../../../lottie/search-not-found.json';
import FilterComponent from "../FilterComponent";
import { setCategoryFilterState, setPaginationState, setDocumentdata, setDocumentConfig, setEmpatyState } from "../../store/reducer/categoryFilterSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const ResultShow = ({ QureyParams }) => {
    const dispatch = useAppDispatch();
    const categoryFilterState = useAppSelector((state) => state.documents.categoryFilterState);
    const dataDocument = useAppSelector((state) => state.documents.documentData);
    const empatyState = useAppSelector((state) => state.documents.empatyState);
    const [isLoading, setLoading] = useState(false);
    const [config, setConfig] = useState({});
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: searchNotFound,
    };
    const t2 = useTranslations('Global');
    const hasFetchedData = useRef(false);

    const getDocument = async (categroy_id, query) => {
        if (categoryFilterState && categoryFilterState.category_id == '') {
            dispatch(setCategoryFilterState({ ...categoryFilterState, category_id: categroy_id ? categroy_id : '', q: query ?? '' }));
        }
        setLoading(true);
        await setTimeout(() => {
            axios.get(`${urlAPI}backend/documents?q=${query ?? ''}&cursorEnabled=1&perPage=${categoryFilterState && categoryFilterState.perPage ? categoryFilterState.perPage : ''}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${categroy_id ?? ''}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        const checkLength = data.data.data.length;
                        setLoading(false);
                        dispatch(setDocumentdata(data.data.data))
                        dispatch(setPaginationState(data.data.links))
                        setConfig(data.data);

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

    const updatePagination = async () => {
        var url_string = config ? config.next_page_url : '';
        setLoading(true);
        if (url_string) {
            var url = new URL(url_string);
            var page = url.searchParams.get("page");

            dispatch(setCategoryFilterState({ ...categoryFilterState, page: page }));

            await axios.get(`${urlAPI}backend/documents?q=${categoryFilterState.q ?? ''}&cursor=1&page=${page}&perPage=${categoryFilterState.perPage ?? ''}&sortBy=${categoryFilterState.sortBy ?? ''}&sortDirection=${categoryFilterState.sortDirection ?? ''}&category_id=${categoryFilterState.category_id ?? ''}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        const NextDocument = data.data.data;
                        setLoading(false)
                        dispatch(setDocumentdata([...NextDocument, dataDocument]))
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

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) return;

        updatePagination();
    };

    useEffect(() => {
        if (!hasFetchedData.current) {
            dispatch(setCategoryFilterState({ ...categoryFilterState, q: QureyParams != '' ? QureyParams : '' }));
            getDocument('', QureyParams ?? '');
            hasFetchedData.current = true;
        }
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
        
        // Clean up the event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
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
            </div>
        </>

    );
}

export default ResultShow;