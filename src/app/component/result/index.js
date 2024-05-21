"use client";
import Card from "@/app/component/cartItem";
import CardLoading from "@/app/component/cardLoading";
import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { urlAPI } from "../../../lib/constant";
import { useLocale, useTranslations } from 'next-intl';
import {
    getLocalStorageItem,
    setLocalStorageItem,
    hasLocalStorageItem
  } from "../../../lib/utils";

const FilterComponent = React.lazy(() => import('../FilterComponent'));

const ResultShow = ({ QueryParams }) => {

    const initialState = hasLocalStorageItem('filterDocuments') ? getLocalStorageItem('filterDocuments') : null;
    const [isLoading, setLoading] = useState(true);
    const [isLoadingSelectCategory, setIsLoadingSelectCategory] = useState(true);
    const [dataPagination, setDataPagination] = useState([]);
    const [dataFetch, setDataFetch] = useState([]);
    const [dataFetchCategory, setDataFetchCategory] = useState([]);
    const [options, setOptions] = useState();
    const [isNotEmpty, setIsNotEmpty] = useState(true)
    const t = useTranslations('Documents');
    const [filterDocuments, setFilterDocuments] = useState(initialState);
    const locale = useLocale();
    const hasFetchedData = useRef(false);

    const fromLocalStorage = () => {
        const data = {
            q: QueryParams ? QueryParams : '',
            cursor: "",
            perPage: "30",
            sortBy: "title",
            sortDirection: "asc",
            user_id: "",
            category_id: "",
            sub_category_id: "",
        }
        setLocalStorageItem('filterDocuments', filterDocuments ? filterDocuments : data);
    }

    const getDocument = async (val) => {
        await axios.get(`${urlAPI}backend/documents?q=${filterDocuments.q}&cursor=${filterDocuments.cursor}&perPage=${filterDocuments.perPage}&sortBy=${filterDocuments.sortBy}&sortDirection=${filterDocuments.sortDirection}&user_id=${filterDocuments.user_id}&category_id=${filterDocuments.category_id}&sub_category_id=${filterDocuments.sub_category_id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const checkLength = data.data.data.length;
                    setLoading(false)
                    setDataFetch(data.data.data)
                    setDataPagination(data.data.links)
                    setOptions(data.data);
                    if (checkLength > 0) {
                        setIsNotEmpty(false)
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
            setFilterDocuments({ ...filterDocuments, page: page });
            await axios.get(`${urlAPI}backend/documents?q=${filterDocuments.q}&cursor=${filterDocuments.cursor}&perPage=${filterDocuments.perPage}&sortBy=${filterDocuments.sortBy}&sortDirection=${filterDocuments.sortDirection}&user_id=${filterDocuments.user_id}&category_id=${filterDocuments.category_id}&sub_category_id=${filterDocuments.sub_category_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
                .then((data) => {
                    if (data.status === 200) {
                        console.log(data.data)
                        setIsLoading(false)
                        setDataFetch(data.data.data)
                        setDataPagination(data.data.links)
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

    const getCategory = async() => {
        await axios.get(`${urlAPI}backend/customer/categories`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    setIsLoadingSelectCategory(false)
                    console.log(data.data);
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
            getDocument();
            getCategory();
            fromLocalStorage();
            hasFetchedData.current = true;
        }
    }, [filterDocuments]);

    return (
        <>
            <div className="mx-auto w-full max-w-screen-xl">
                {
                    !isNotEmpty &&
                    <>
                        <FilterComponent filterDocuments={filterDocuments} setFilterDocuments={setFilterDocuments} DataFetchCategory={dataFetchCategory}  FilterDocument={filterDocuments} isLoading={isLoadingSelectCategory} />
                        <div className="result-word">
                            {

                                !isLoading ?
                                    <p>{options.from}-{options.to} of {options.total} results</p> :
                                    <Skeleton className={"w-[180px] h-[20px]"} />
                            }
                        </div>
                    </>
                }


                {
                    isNotEmpty &&
                    <div className="content-empty">
                        <h3>{t('content empty')}</h3>
                        <img src="/image/content-empty.webp" alt="content is empty" />
                    </div>
                }
                {
                    !isNotEmpty &&
                    <div className="result-show">
                        {
                            !isLoading ? dataFetch && dataFetch.map((item, index) => {
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
                    !isNotEmpty &&
                    <div className="mt-[32px] flex justify-between">
                        <Pagination>
                            <PaginationContent>
                                {
                                    dataPagination && dataPagination.map((data) => {
                                        if (data.label === "&laquo; Previous") {
                                            return (
                                                <>
                                                    {
                                                        data.url != null && <PaginationItem>
                                                            <PaginationPrevious className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                        </PaginationItem>
                                                    }
                                                </>
                                            )
                                        } else if (data.label === "Next &raquo;") {
                                            return (
                                                <>
                                                    {
                                                        data.url != null && <PaginationItem>
                                                            <PaginationPrevious className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
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