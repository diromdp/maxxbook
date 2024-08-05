"use client";
import dynamic from 'next/dynamic';
import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl';
import Lottie from 'react-lottie';
import * as searchNotFound from '@/lottie/search-not-found.json';
import { urlAPI } from "@/lib/constant";

import { setDocumentCategoryPagination, setDocumentCategorySingle, setEmptyStateDocumentCategory, setDocumentConfigSingle } from "@/store/reducer/categoryFilterSlice";
import { useAppDispatch, useAppSelector } from "@/store";

const Card = dynamic(() => import('@/components/component/cartItem'), {
    ssr: false,
})
const CardLoading = dynamic(() => import('@/components/component/cardLoading'), {
    ssr: false,
})

const ResultShowID = ({ idCategory, idSubCategory }) => {
    const dispatch = useAppDispatch();
    const [isLoading, setLoading] = useState(true);
    const categoryFilterState = useAppSelector((state) => state.documents.categoryFilterSingleState);
    const documentConfigSingle = useAppSelector((state) => state.documents.documentConfigSingle);

    const dataDocument = useAppSelector((state) => state.documents.documentCategorySingle);
    const emptyState = useAppSelector((state) => state.documents.emptyStateDocumentCategory);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: searchNotFound,
    };
    const t2 = useTranslations('Global');

    const hasFetchedData = useRef(false);

    const getDocument = async () => {
        await axios.get(`${urlAPI}backend/documents?cursorEnabled=1&perPage=${20}&sortBy=${categoryFilterState.sortBy ?? ''}&sortDirection=${categoryFilterState.sortDirection ?? ''}&category_id=${idCategory ?? ''}&sub_category_id=${idSubCategory ?? ''}`, {
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
                    dispatch(setDocumentConfigSingle(data.data));
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

    const updatePagination = async () => {
        const nextPage = documentConfigSingle.current_page + 1;

        await axios.get(`${urlAPI}backend/documents?q=${categoryFilterState && categoryFilterState.q ? categoryFilterState.q : ''}&page=${nextPage}&cursorEnabled=1&perPage=${20}&sortBy=${categoryFilterState && categoryFilterState.sortBy ? categoryFilterState.sortBy : ''}&sortDirection=${categoryFilterState && categoryFilterState.sortDirection ? categoryFilterState.sortDirection : ''}&user_id=${categoryFilterState && categoryFilterState.user_id ? categoryFilterState.user_id : ''}&category_id=${categoryFilterState && categoryFilterState.category_id ? categoryFilterState.category_id : ''}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const listDocument = data.data.data;
                    setLoading(false)
                    dispatch(setDocumentCategorySingle([...listDocument, ...dataDocument]))
                    dispatch(setDocumentCategoryPagination(data.data.links))
                    dispatch(setDocumentConfigSingle(data.data));

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

    useEffect(() => {
        if (!hasFetchedData.current) {
            getDocument();
            hasFetchedData.current = true;
        }
    }, []);

    console.log(documentConfigSingle && documentConfigSingle)

    return (
        <>
            <div className="screen-layer">
                {
                    emptyState &&
                    <div className="content-empty w-full h-full m-auto">
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
                                        slug={item.slug} 
                                    />
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
                <div className="Load-more py-[32px] flex justify-center items-center">
                    <Button className={`btn-primary text-[18px] w-fit h-[40px] ${documentConfigSingle.current_page === documentConfigSingle.last_page ? "pointer-events-none opacity-50" : ""}`} disabled={documentConfigSingle.current_page === documentConfigSingle.last_page} onClick={() => updatePagination()}>{t2('Load more')}</Button>
                </div>
            </div>
        </>

    );
}

export default ResultShowID;