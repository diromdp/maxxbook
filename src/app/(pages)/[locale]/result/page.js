import React from 'react';
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import ResultShow from '../../../component/result';
import { urlAPI } from "../../../../lib/constant";


async function getDetails() {
    const data = await fetch(`${urlAPI}backend/settings?keys=seo.title_result,seo.description_seo_result,seo.title_result_id,seo.description_seo_result_id`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Accept': "application/json",
        },
    });

    if (!data.ok) {
        throw new Error('Failed to fetch data')
    }
    return data.json()
}

export async function generateMetadata() {
    const headersList = headers();
    const pathname = headersList.get("referer");
    const detailSEO = await getDetails();
    const selectedTitle = detailSEO.filter(x => x.key === 'seo.title_result');
    const selectedDesc = detailSEO.filter(x => x.key === 'seo.description_seo_result');
    const selectedTitleID = detailSEO.filter(x => x.key === 'seo.title_result_id');
    const selectedDescID = detailSEO.filter(x => x.key === 'seo.description_seo_result_id');
    const locale = await getLocale();

    if( locale === 'en') {
        return {
            title: selectedTitle ?  selectedTitle[0].value : '',
            description: selectedDesc ? selectedDesc[0].value : '',
            twitter: {
                card: 'summary_large_image',
                title: selectedTitle ? selectedTitle[0].value : '',
                url: pathname,
                description: selectedDesc ? selectedDesc[0].value : '',
            },
            openGraph: {
                title: selectedTitle ? selectedTitle[0].value : '',
                description: selectedDesc ? selectedDesc[0].value : '',
                url: pathname,
                type: 'website',
            },
        }
    } else {
        return {
            title: selectedTitleID ?  selectedTitleID[0].value : '',
            description: selectedDescID ? selectedDescID[0].value : '',
            twitter: {
                card: 'summary_large_image',
                title: selectedTitleID ? selectedTitleID[0].value : '',
                url: pathname,
                description: selectedDescID ? selectedDescID[0].value : '',
            },
            openGraph: {
                title: selectedTitleID ? selectedTitleID[0].value : '',
                description: selectedDescID ? selectedDescID[0].value : '',
                url: pathname,
                type: 'website',
            },
        }
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