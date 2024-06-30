"use client";
import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Skeleton } from "@/components/ui/skeleton"
import { urlAPI } from "../../../lib/constant";
import axios from "axios";


const ContentAbout = () => {

    const [detailSEO, setDetailSeo] = useState();
    const [isLoading, setLoading] = useState(true);
    const localeNext = useLocale();


    const getData = async () => {
        await axios.get(`${urlAPI}backend/settings?keys=page.description_about,page.description_about_id`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json",
            }
        })
            .then((data) => {
                if (data.status === 200) {
                    console.log(data.data);
                    setDetailSeo(data.data);
                    setLoading(false);
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
    };

    const selectedEditor = detailSEO && detailSEO.filter(x => x.key === 'page.description_about')
    const selectedEditorID = detailSEO && detailSEO.filter(x => x.key === 'page.description_about_id')

    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            {
                isLoading ? 
                <div className="flex flex-col space-y-3 mb-3">
                    <Skeleton className="h-5 w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
                </div> : 
                <div className="desc">
                    {
                        localeNext === "en" ?
                            <div dangerouslySetInnerHTML={{ __html: selectedEditor.length > 0 && selectedEditor[0].value }}></div> :
                            <div dangerouslySetInnerHTML={{ __html: selectedEditorID.length > 0 && selectedEditorID[0].value }}></div>
                    }
                </div>
            }

        </>
    );
}

export default ContentAbout;