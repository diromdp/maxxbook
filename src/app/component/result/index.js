"use client";
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
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { urlAPI } from "../../../lib/constant";
import { useTranslations } from 'next-intl';

import FilterComponent from "../FilterComponent";
import { setCategoryFilterState, setPaginationState, setDocumentdata, setDocumentConfig, setEmpatyState } from "../../store/reducer/categoryFilterSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const ResultShow = ({ QureyParams }) => {
    const dispatch = useAppDispatch();
    const categoryFilterState = useAppSelector((state) => state.documents.categoryFilterState);
    const optionsDocument = useAppSelector((state) => state.documents.documentConfig);
    const dataPaginationState = useAppSelector((state) => state.documents.documentPagination);
    const dataDocument = useAppSelector((state) => state.documents.documentData);
    const empatyState = useAppSelector((state) => state.documents.empatyState);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSelectCategory, setIsLoadingSelectCategory] = useState(true);
    const [dataFetchCategory, setDataFetchCategory] = useState();

    const t = useTranslations('Documents');
    const hasFetchedData = useRef(false);

    const getDocument = async (val) => {
        if(categoryFilterState && categoryFilterState.category_id == '') {
            dispatch(setCategoryFilterState({ ...categoryFilterState, category_id: val ? val : '', q: QureyParams != '' ? QureyParams : '' }));
        }

       await setTimeout(() => {
             axios.get(`${urlAPI}backend/documents?q=${QureyParams}&cursor=${categoryFilterState && categoryFilterState.cursor ? categoryFilterState.cursor : ''}&perPage=${categoryFilterState && categoryFilterState.perPage ? categoryFilterState.perPage : ''}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${val ? val : ''}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        const checkLength = data.data.data.length;
                        setLoading(false)
                        dispatch(setDocumentdata(data.data.data))
                        dispatch(setPaginationState(data.data.links))
                        dispatch(setDocumentConfig(data.data));
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

            await axios.get(`${urlAPI}backend/documents?q=${categoryFilterState && categoryFilterState.q ? categoryFilterState.q : ''}&page=${page}&cursor=${categoryFilterState && categoryFilterState.cursor ? categoryFilterState.cursor : ''}&perPage=${categoryFilterState && categoryFilterState.perPage ? categoryFilterState.perPage : ''}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${categoryFilterState && categoryFilterState.category_id ? categoryFilterState.category_id : ''}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        console.log('asdasdasd')
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

    const getCategory = async () => {
        await axios.get(`${urlAPI}backend/customer/categories`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIsLoadingSelectCategory(false)
                    setDataFetchCategory(data.data)
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
        if (!hasFetchedData.current) {
            dispatch(setCategoryFilterState({ ...categoryFilterState, q: QureyParams != '' ? QureyParams : '' }));
            getDocument();
            getCategory();
            hasFetchedData.current = true;
        }
    }, []);

    return (
        <>
            <div className="screen-layer">
                {
                    <>
                        <FilterComponent
                            getDocument={(val) => getDocument(val)}
                            DataFetchCategory={dataFetchCategory}
                            isLoading={isLoadingSelectCategory}
                        />
                        {
                            !empatyState &&
                            <div className="result-word">
                                {
                                    !isLoading && optionsDocument ?
                                        <p>{optionsDocument.current_page}-{optionsDocument.total} of {optionsDocument.total} results</p> :
                                        <Skeleton className={"w-[180px] h-[20px]"} />
                                }
                            </div>
                        }
                    </>
                }
                {
                    empatyState &&
                    <div className="content-empty">
                        <h3>{t('content empty')}</h3>
                        <img src="/image/content-empty.webp" alt="content is empty" />
                    </div>
                }
                {
                    !empatyState &&
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
                                        slug={`${item.slug}`} />
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
                    !empatyState &&
                    <div className="mt-[32px] flex justify-between">
                        <Pagination>
                            <PaginationContent>
                                {
                                    dataPaginationState && dataPaginationState.map((data) => {
                                        if (data.label === "&laquo; Previous") {
                                            return (
                                                <>
                                                    {
                                                        <PaginationItem>
                                                            <PaginationPrevious disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                        </PaginationItem>
                                                    }
                                                </>
                                            )
                                        } else if (data.label === "Next &raquo;") {
                                            return (
                                                <>
                                                    {
                                                        <PaginationItem>
                                                            <PaginationNext disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                        </PaginationItem>
                                                    }
                                                </>
                                            )
                                        } else {
                                            return (
                                                <PaginationItem>
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