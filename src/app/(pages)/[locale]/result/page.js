import React from 'react';
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import ResultShow from '@/components/component/result';
import { BaseUrl } from "@/lib/constant";

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("referer");

    try {
        const response = await fetch(`${BaseUrl}/api/public/settings?keys=seo.title_result,seo.description_seo_result,seo.title_result_id,seo.description_seo_result_id`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "application/json",
                },
            }
        );

        const data = await response.json();
        const detailSEO = data.data;

        if (detailSEO != undefined || detailSEO && detailSEO.length > 0) {
            const selectedTitle = detailSEO && detailSEO.filter(x => x.key === 'seo.title_result');
            const selectedDesc = detailSEO && detailSEO.filter(x => x.key === 'seo.description_seo_result');
            const selectedTitleID = detailSEO && detailSEO.filter(x => x.key === 'seo.title_result_id');
            const selectedDescID = detailSEO && detailSEO.filter(x => x.key === 'seo.description_seo_result_id');
            const locale = await getLocale();

            if (locale === 'en') {
                if (selectedTitle.length > 0 && selectedDescID.length > 0) {
                    return {
                        title: selectedTitle[0].value,
                        description: selectedDesc[0].value,
                        twitter: {
                            card: 'summary_large_image',
                            title: selectedTitle[0].value,
                            url: pathname,
                            description: selectedDesc[0].value,
                            images: [{ url: '/image/og-image.png' }],

                        },
                        openGraph: {
                            title: selectedTitle[0].value,
                            description: selectedDesc[0].value,
                            url: pathname,
                            type: 'website',
                            images: [{ url: '/image/og-image.png' }],

                        },
                    }
                }
            } else {
                if (selectedTitleID.length > 0 && selectedDescID.length > 0) {
                    return {
                        title: selectedTitleID[0].value,
                        description: selectedDescID[0].value,
                        twitter: {
                            card: 'summary_large_image',
                            title: selectedTitleID[0].value,
                            url: pathname,
                            description: selectedDescID[0].value,
                            images: [{ url: '/image/og-image.png' }],

                        },
                        openGraph: {
                            title: selectedTitleID[0].value,
                            description: selectedDescID[0].value,
                            url: pathname,
                            type: 'website',
                            images: [{ url: '/image/og-image.png' }],

                        },
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

export default function result({ searchParams }) {

    const query = searchParams.query ?? '';
    return (
        <>
            <div className="result-page">
                <ResultShow QureyParams={query} />
            </div>
        </>
    );
}