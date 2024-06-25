"use client";
import dynamic from 'next/dynamic';
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext
} from "@/components/ui/pagination";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from 'next-intl';
import Lottie from 'react-lottie';
import * as searchNotFound from '../../../lottie/search-not-found.json';
import { urlAPI } from "../../../lib/constant";

import { setDocumentCategoryPagination, setCategoryFilterState, setDocumentCategorySingle, setEmptyStateDocumentCategory } from "../../store/reducer/categoryFilterSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const Card = dynamic(() => import('@/app/component/cartItem'), {
    ssr: false,
})
const CardLoading = dynamic(() => import('@/app/component/cardLoading'), {
    ssr: false,
})

const ResultShowID = ({ idCategory, idSubCategory }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setLoading] = useState(true);
    const categoryFilterState = useAppSelector((state) => state.documents.categoryFilterSingleState);
    const dataPaginationState = useAppSelector((state) => state.documents.documentCategoryPagination);
    const dataDocument = useAppSelector((state) => state.documents.documentCategorySingle);
    const emptyState = useAppSelector((state) => state.documents.emptyStateDocumentCategory);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: searchNotFound,
    };

    const t = useTranslations('Documents');
    const t2 = useTranslations('Global');

    const hasFetchedData = useRef(false);

    const getDocument = async () => {
        await axios.get(`${urlAPI}backend/documents?cursor=${categoryFilterState && categoryFilterState.cursor ? categoryFilterState.cursor : ''}&perPage=${categoryFilterState && categoryFilterState.perPage ? categoryFilterState.perPage : ''}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&sub_category_id=${idSubCategory ? idSubCategory : ''}&category_id=${idCategory ? idCategory : ''}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const checkLength = data.data.data.length;
                    setLoading(false)
                    dispatch(setDocumentCategorySingle(data.data.data))
                    dispatch(setDocumentCategoryPagination(data.data.links))
                    if (checkLength > 0) {
                        dispatch(setEmptyStateDocumentCategory(false))
                    } else {
                        dispatch(setEmptyStateDocumentCategory(true))
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
    }

    const updatePagination = async (val) => {
        var url_string = val;

        if (url_string) {
            var url = new URL(url_string);
            var page = url.searchParams.get("page");

            dispatch(setCategoryFilterState({ ...categoryFilterState, page: page }));

            await axios.get(`${urlAPI}backend/documents?page=${page}&cursor=${categoryFilterState && categoryFilterState.cursor ? categoryFilterState.cursor : ''}&perPage=${categoryFilterState && categoryFilterState.perPage ? categoryFilterState.perPage : ''}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${idCategory}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        console.log('asdasdasd')
                        setLoading(false)
                        dispatch(setDocumentCategorySingle(data.data.data))
                        dispatch(setDocumentCategoryPagination(data.data.links))
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
            getDocument();
            hasFetchedData.current = true;
        }
    }, []);

    return (
        <>
            <div className="screen-layer">
                {
                    emptyState &&
                    <div className="content-empty w-full h-full m-auto">
                        <h1 className="text-[38px] font-bold">{t2('Documents Not Found')}</h1>
                        <div className="lg:w-[400px] lg:h-[400px]">
                            <Lottie options={defaultOptions}
                                className="lottie-container "
                                disabled={true}    
                            />
                        </div>
                    </div>
                }
                {
                    !emptyState &&
                    <div className="result-show">
                        {
                            !isLoading ? dataDocument && dataDocument.map((item, index) => {
                                return (
                                    <Card
                                        key={index}
                                        colorImage={item.color}
                                        imagePath={item.thumb_url}
                                        title={item.title}
                                        description={item.description}
                                        slug={item.slug} />
                                )
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
                    !emptyState &&
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
                                                            <PaginationPrevious disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                        </PaginationItem>
                                                    }
                                                </>
                                            )
                                        } else if (data.label === "Next &raquo;") {
                                            return (
                                                <>
                                                    {
                                                        <PaginationItem key={index}>
                                                            <PaginationNext disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
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

export default ResultShowID;