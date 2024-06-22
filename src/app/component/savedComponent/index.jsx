"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import SliderCardItem from "@/app/component/sliderCardItem";
import { useTranslations, useLocale } from "next-intl";
import { urlAPI } from "../../../lib/constant";
import { useAppSelector } from "../../store";
import Link from "next/link";

const SavedComponent = () => {
    const getToken = useAppSelector((state) => state.authUserStorage.authUser);
    const token = getToken.access_token;
    const [isLoading, setLoading] = useState(true);
    const [listDocument, setLisDocument] = useState([]);
    const [filterData, setFilterData] = useState({
        q: "",
        cursor: "",
        perPage: "10",
        sortBy: "title",
        sortDirection: "asc",
    });
    const hasFetchedData = useRef(false);
    const t = useTranslations('Exporler');
    const locale = useLocale();

    const getData = async () => {
        await axios.get(`${urlAPI}backend/customer/documents/saved?cursor=${filterData.cursor}&perPage=${filterData.perPage}&sortBy=${filterData.sortBy}&sortDirection=${filterData.sortDirection}`, {
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
    useEffect(() => {
        if (!hasFetchedData.current) {
            getData();
            hasFetchedData.current = true;
        }
    }, []);

    return (
        <>
            {
                token &&
                <>
                    {
                        listDocument.length > 0 &&
                        <div className="item-view">
                            <div className="flex justify-between items-center">
                                <h2>{t('saved documents')}</h2>
                                <Link href={`/${locale}/user/saved`} className="view-more">{t('View more')}</Link>
                            </div>
                            <SliderCardItem data={listDocument} />
                        </div>
                    }
                </>

            }
        </>
    );
}

export default SavedComponent;