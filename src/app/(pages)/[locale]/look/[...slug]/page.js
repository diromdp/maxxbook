"use client";
import Card from "@/app/component/cartItem";
import CardLoading from "@/app/component/cardLoading";
import { useState, useEffect, useRef } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { urlAPI } from "../../../../../lib/constant";
import { getInitials } from "../../../../../lib/utils";
import { useAppSelector } from "../../../../store";

const LookUserDetail = ({ params }) => {
    const [isLoading, setIsloading] = useState(true);
    const [dataDocument, setDataDocument] = useState([]);
    const [dataPagination, setDataPagination] = useState([]);
    const [filterData, setFilterData] = useState({
        q: "",
        cursor: "",
        perPage: "50",
        sortBy: "title",
        sortDirection: "asc",
    });
    const getUserUploadInfo = useAppSelector((state) => state.documents.ownerOfUpload);

    const hasFetchedData = useRef(false);

    const { slug } = params;

    const getData = async () => {
        await axios.get(`${urlAPI}backend/documents?cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}&user_id=${slug}`, {
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data.data;
                    setIsloading(false);
                    setDataDocument(dataJson);
                    setDataPagination(data.data.links)
                }
            })
            .catch(function (error) {
                if (error.response) {
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
            await axios.get(`${urlAPI}backend/documents?cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}&user_id=${slug}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
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

    useEffect(() => {
        if (!hasFetchedData.current) {
            getData();
            hasFetchedData.current = true;
        }
    }, []);
    console.log(getUserUploadInfo && getUserUploadInfo)
    return (
        <>
            <div className="look-user-detail">
                <div className="bg-sky-700 py-[50px] min-h-[130px]">
                    <div className="screen-layer user-info">
                        <div className="circle">
                            {getUserUploadInfo && getInitials(getUserUploadInfo.name)}
                        </div>
                        <div className="name">
                            {getUserUploadInfo && getUserUploadInfo.name}
                        </div>
                    </div>
                </div>
                <div className="list-document">
                    <div className="screen-layer">
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
                        <div className="my-[32px] flex justify-between">
                            <Pagination>
                                <PaginationContent>
                                    {
                                        dataDocument.length > 0 && dataPagination.map((data) => {
                                            if (data.label === "&laquo; Previous") {
                                                return (
                                                    <PaginationItem>
                                                        <PaginationPrevious disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                    </PaginationItem>

                                                )
                                            } else if (data.label === "Next &raquo;") {
                                                return (
                                                    <PaginationItem>
                                                        <PaginationNext disabled={data.url != null ? false : true} className="cursor-pointer" data-url={data.url} onClick={() => updatePagination(data.url)} />
                                                    </PaginationItem>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default LookUserDetail;