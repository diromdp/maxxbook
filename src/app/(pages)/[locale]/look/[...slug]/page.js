"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { urlAPI } from "@/lib/constant";
import { getInitials } from "@/lib/utils";
import { useAppSelector } from "@/store";

const Card = dynamic(() => import("@/components/component/cartItem"), {
    ssr: false,
});

const CardLoading = dynamic(() => import("@/components/component/cardLoading"), {
    ssr: false,
});

const LookUserDetail = ({ params }) => {
    const [isLoading, setIsloading] = useState(true);
    const [dataDocument, setDataDocument] = useState([]);
    const [documentConfig, setDocumentConfig] = useState({});
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
                    const config = data.data;
                    setIsloading(false);
                    setDataDocument(dataJson);
                    setDocumentConfig(config);
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
            await axios.get(`${urlAPI}backend/documents?cursor=${filterData.cursor}&page=${page}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}&user_id=${slug}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                }
            })
            .then((data) => {
                if (data.status === 200) {
                    const dataJson = data.data.data;
                    const config = data.data;
                    setIsloading(false)
                    setDataDocument(dataJson);
                    setDocumentConfig(config);
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

    return (
        <>
            <div className="look-user-detail">
                <div className="bg-sky-700 py-[50px] min-h-[130px] px-[24px] 3xl:px-0">
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
                        <div className="result-show px-[24px] 3xl:px-0">
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default LookUserDetail;