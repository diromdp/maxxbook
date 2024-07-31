"use client";
import { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import Link from "next/link";
import { urlAPI } from "../../../lib/constant";

const ListCategory = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasFetchedData = useRef(false);
    const localData = useLocale();

    const getData = async () => {
        await axios.get(`${urlAPI}backend/categories`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
        .then((data) => {
            if (data.status === 200) {
                let filtereData = data.data;
                setIsLoading(false)
                setData(filtereData)
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
            getData();
            hasFetchedData.current = true;
        }
    }, []);
    
    return (
        <>
            <div className="list-of-category">
                {
                    isLoading ?
                        <>
                            {[...Array(12)].map((x, i) =>
                                <div key={i} className="items">
                                    <h3>
                                        <Skeleton className="h-6 lg:w-[250px]" />
                                    </h3>
                                    <ul>
                                        {
                                            [...Array(12)].map((x, n) =>
                                                <li key={n}>
                                                    <Skeleton className="h-6 lg:w-[200px]" />
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            )}
                        </> :
                        <>
                            {
                                data && data.map((item, key) => {
                                    if (item.sub_categories.length > 0) {
                                        return (
                                            <div key={key} className="items">
                                                <h3>
                                                    <Link href={`/${localData}/catagories/${item.slug}`}>
                                                        {localData == "en" ? item.name : item.name_id}
                                                    </Link>
                                                </h3>
                                                <ul>
                                                    {
                                                        item.sub_categories && item.sub_categories.map((sub_category, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <Link href={`/${localData}/subcategory/${sub_category.slug}`}>
                                                                        {localData == "en" ? sub_category.name : sub_category.name_id}
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </>
                }
            </div>
        </>
    );
}

export default ListCategory;